import { db, auth } from "@/config/firebase";
import { router } from "expo-router";
import {
  collection,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import useLoading from "./useLoading";

export default function useFetchFirestore(collectionName: string) {
  const [tempData, setTempData] = useState<Record<string, any> | undefined>();
  const [firstDocs, setFirstDocs] = useState<any>();
  const [lastDocs, setLastDocs] = useState<any>();
  const [currentIndexPage, setCurrentIndexPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const currentUser = auth.currentUser;

  // logics for fetching current user's rank
  const fetchCurrentUserRank = async () => {
    // setCurrentUserRank(null);
    const allQuery = query(
      collection(db, collectionName),
      orderBy("totalAnsweredQuestions", "desc"),
      orderBy("totalScores", "desc"),
      orderBy("createdAt", "desc")
    );

    const allDocsSnap = await getDocs(allQuery);
    const allDocs = allDocsSnap.docs;
    const rankIndex = allDocs.findIndex((doc) => doc.id === currentUser?.uid);
    if (rankIndex !== -1) {
      setCurrentUserRank(rankIndex + 1);
    }
  };

  // logics for refresh data
  const refreshData = async () => {
    startLoading();
    // setCurrentUserRank(null);
    try {
      const q = query(
        collection(db, collectionName),
        orderBy("totalAnsweredQuestions", "desc"),
        orderBy("totalScores", "desc"),
        orderBy("createdAt", "desc"),
        limit(6)
      );
      const querySnapShot = await getDocs(q);
      const docs = querySnapShot.docs;

      setHasNextPage(docs.length === 6);
      setHasPrevPage(false);

      const displayDocs = docs.slice(0, 5);
      const data = displayDocs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTempData(data);
      setFirstDocs(displayDocs[0]);
      setLastDocs(displayDocs[displayDocs.length - 1]);
      setCurrentIndexPage(0);

      await fetchCurrentUserRank();
    } catch (error) {
      console.log("Error refreshing leaderboard:", error);
    } finally {
      stopLoading();
    }
  };

  // logics for nextPaging
  const nextPage = async () => {
    if (!lastDocs) return;
  
    startLoading();
    try {
      const q = query(
        collection(db, collectionName),
        orderBy("totalAnsweredQuestions", "desc"),
        orderBy("totalScores", "desc"),
        orderBy("createdAt", "desc"),
        startAfter(lastDocs),
        limit(6)
      );
      const querySnapShot = await getDocs(q);
      const docs = querySnapShot.docs;
  
      setHasNextPage(docs.length === 6);
      setHasPrevPage(true);
  
      const displayDocs = docs.slice(0, 5);
      const data = displayDocs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (data.length > 0) {
        setTempData(data);
        setFirstDocs(displayDocs[0]);
        setLastDocs(displayDocs[displayDocs.length - 1]);
        setCurrentIndexPage((prev) => prev + 1);
      }
      await fetchCurrentUserRank();
    } catch (error) {
      console.log("Error on nextPage:", error);
    } finally {
      stopLoading();
    }
  };
  
  // logics for prevPaging
  const prevPage = async () => {
    if (!firstDocs) return;
  
    startLoading();
    try {
      const q = query(
        collection(db, collectionName),
        orderBy("totalAnsweredQuestions", "desc"),
        orderBy("totalScores", "desc"),
        orderBy("createdAt", "desc"),
        endBefore(firstDocs),
        limitToLast(6)
      );
      const querySnapShot = await getDocs(q);
      const docs = querySnapShot.docs;
  
      setHasPrevPage(docs.length === 6 || currentIndexPage > 1);
      setHasNextPage(true);
  
      const displayDocs = docs.slice(-5);
      const data = displayDocs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (data.length > 0) {
        setTempData(data);
        setFirstDocs(displayDocs[0]);
        setLastDocs(displayDocs[displayDocs.length - 1]);
        setCurrentIndexPage((prev) => Math.max(prev - 1, 0));
      }
      await fetchCurrentUserRank();
    } catch (error) {
      console.log("Error on prevPage:", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (!collectionName || !currentUser) {
      alert("Invalid or not logged in.");
      router.replace("/screens/login");
      return;
    }

    // fetching user profiles datas
    if (collectionName === "user_profiles") {
      const userDoc = doc(db, collectionName, currentUser.uid);
      const unsubscribe = onSnapshot(userDoc, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const total = data.easy + data.medium + data.hard;
          const charts =
            total > 0
              ? [
                  { name: "Easy", population: +(data.easy / total * 100).toFixed(2), color: "green" },
                  { name: "Medium", population: +(data.medium / total * 100).toFixed(2), color: "black" },
                  { name: "Hard", population: +(data.hard / total * 100).toFixed(2), color: "yellow" },
                ]
              : [];

          setTempData({
            charts,
            infos: {
              currentUserEmail: data.currentUserEmail,
              totalQuestionsAnswered: total,
              Easy: data.easy,
              Medium: data.medium,
              Hard: data.hard,
            },
          });
        }
      });
      return () => unsubscribe();
    }

    // fetching quiz histories datas
    if (collectionName === "quiz_histories") {
      const q = query(collection(db, collectionName), where("userID", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTempData(data);
      });
      return () => unsubscribe();
    }

    // fetching profile picture setting datas
    if(collectionName === "profile_picture_setting"){
      const userDoc = doc(db, collectionName, currentUser.uid);
      const unsubscribe = onSnapshot(userDoc, (snap) => {
        if (snap.exists()) {
          const data = snap.data().profile_picture_base64;
          console.log(data);
          setTempData(data);
        }
      });

      return () => unsubscribe();
    }

    // fetching leaderboard datas
    if (collectionName === "leaderboard") refreshData();
  }, [collectionName]);

  return {
    tempData,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    isLoading,
    currentIndexPage,
    currentUserRank,
    refreshData,
  };
}
