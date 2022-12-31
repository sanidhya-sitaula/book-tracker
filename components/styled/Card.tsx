import { View, StyleSheet } from "react-native"; 

type CardProps = {
    children: React.ReactNode;
}

export const Card = ({children}: CardProps) => {
    return (
        <View style = {styles.container}>
            {children}
        </View>
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