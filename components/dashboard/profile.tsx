import useFetchFirestore from "@/utils/custom-hooks/useFetchFirestore";
import useScreenDimentions from "@/utils/custom-hooks/useScreenDimentions";
import { PieChart } from 'react-native-chart-kit'
import { ActivityIndicator, View, Text } from "react-native";
import { profileScreenStyles } from "@/stylesheets/profile-screenStyles";

export default function Profile(){
    const { tempData } = useFetchFirestore("user_profiles");
    const screenWidth = useScreenDimentions();
    
    return (
        <>
          {!tempData ? (
              <ActivityIndicator style={profileScreenStyles.activityIndicationContainer} size="large" color="black"/>
        ) : ( 
            <>
            <Text style={profileScreenStyles.textTitle}>{`> ${tempData?.infos?.currentUserEmail}`}</Text>

             {/* total of questions container */}
             <View style={profileScreenStyles.TotalOfQuestionsContainer}>
             <View style={profileScreenStyles.TotalOfQuestionsSubContainer}>
             <Text style={profileScreenStyles.SubTitles1}>{`Total of Questions Answered`}</Text>
             <Text style={profileScreenStyles.SubTitles2}>{tempData?.infos?.totalQuestionsAnswered}</Text>
             </View>

             {/* key value pairs */}
             <View style={profileScreenStyles.keyValuePairsContainer}>
              {Object.entries(tempData?.infos!).slice(2).map(([key, value], i) => (
                <View style={profileScreenStyles.keyValuePairsSubContainer} key={i}>
                <Text style={profileScreenStyles.keyTitle}>{`${key}`}</Text>
                <Text style={profileScreenStyles.valueTitle}>{`${value}`}</Text>
                </View>
             ))}
             </View>
             
             {/* Pie Chart */}
             <PieChart 
                data={tempData?.charts}
                width={screenWidth}
                height={200}
                chartConfig={{
                backgroundColor: profileScreenStyles.chartConfigBgColor.backgroundColor,
                backgroundGradientFrom: profileScreenStyles.chartConfigBgGradientFrom.backgroundColor,
                backgroundGradientTo: profileScreenStyles.chartConfigBgGradientTo.backgroundColor,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {borderRadius: profileScreenStyles.chartConfigBorderRaidus.borderRadius}}}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute/>
               </View>
            </>
           ) 
         }
      </>
    );
}