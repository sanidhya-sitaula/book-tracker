import { View, StyleSheet, Pressable } from "react-native"; 

type CardProps = {
    children: React.ReactNode;
    onPress?: () => void;
}

export const Card = ({children, onPress}: CardProps) => {
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
        backgroundColor: "#1B1C39",
        padding: 20,
        shadowOpacity: 0.2,
        alignItems: "flex-start"
    }
})