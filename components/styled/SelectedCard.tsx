import { View, StyleSheet, Pressable } from "react-native"; 

type SelectedCardProps = {
    children: React.ReactNode;
    onPress?: () => void;
}

export const SelectedCard = ({children, onPress}: SelectedCardProps) => {
    return (
        <Pressable style = {styles.container} onPress = {onPress}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#BA6400",
        padding: 20,
        shadowOpacity: 0.2,
        alignItems: "flex-start"
    }
})