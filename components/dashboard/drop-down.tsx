import { mainScreenStyles } from "@/stylesheets/main-screenStyles";
import { drop_down_lists } from "@/utils/drop-down-lists";
import { View, TextInput, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import SubmitButton from "./submit-button";

export default function DropDownPicker({setQuestionCategory,
                                        setDifficultyLevel,
                                        questionsLimit,
                                        setQuestionsLimit,
                                        isLoading,
                                        handleSelectionsSubmit
                                        }: any){
    console.log("drop-down-component triggered!");
    return (
      <>
        <View style={mainScreenStyles.subContainer2}>
        <Text style={mainScreenStyles.textTitle}>Select your Quiz!</Text>
        <SelectList
        setSelected={setQuestionCategory}
        data={drop_down_lists.question_categories}
        search={false}
        boxStyles={{borderWidth: 2, borderColor: "black"}}
        placeholder="Select Question Category"
        save="value"/>
        <SelectList
        setSelected={setDifficultyLevel}
        data={drop_down_lists.difficulty_levels}
        search={false}
        boxStyles={{borderWidth: 2, borderColor: "black"}}
        placeholder="Select Difficulty Level"
        save="value"/>
        <TextInput
        placeholder="Number of questions..."
        value={questionsLimit}
        onChangeText={(e) => setQuestionsLimit(e)}
        keyboardType="numeric"
        style={mainScreenStyles.textInput}/>
        <SubmitButton isLoading={isLoading} handleSelectionsSubmit={handleSelectionsSubmit}/>
        </View>
      </>
    );
}
