import { Book } from "../../models/Book";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "./Card";
import ProgressBar from "react-native-progress-bar-horizontal";

type Props = {
  book: Book;
  onPress: () => void;
  withInProgressLabel?: boolean;
};

export const BookContainer = ({ book, onPress, withInProgressLabel }: Props) => {
  return (
    <View style={styles.continueReadingCardContainer}>
      <Card onPress={() => onPress()}>
        <View style={styles.cardTopContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: book.image }} style={styles.bookImage} />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.bookTitleText}>{book.name}</Text>
            <Text style={styles.bookAuthorText}>{book.author}</Text>
          </View>
        </View>
        {withInProgressLabel && (
          <View style={styles.cardBottomContentContainer}>
            <View>
              <ProgressBar
                progress={book.current_page / book.pages}
                fillColor="#BA6400"
                unfilledColor="#434343"
                height={10}
                animated={true}
                width={300}
              />
            </View>
            <View>
              <Text style={styles.progressPercent}>{Math.floor((book.current_page / book.pages) * 100)}%</Text>
            </View>
          </View>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  continueReadingCardContainer: {
    flex: 1,
    marginTop: 20,
  },
  cardTopContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexGrow: 2,
  },
  cardBottomContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  bookTitleText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 25,
    marginBottom: 10,
    flexGrow: 3,
    flex: 1,
    flexShrink: 3,
    flexWrap: "wrap",
  },
  bookAuthorText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-regular",
    fontSize: 17,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 10,
    flexShrink: 3,
    flexGrow: 3,
  },
  cardTopContainer: {
    display: "flex",
    flex: 1,
    flexShrink: 3,
    flexGrow: 3,
    flexDirection: "row",
  },
  cardTextContainer: {
    flex: 1,
    flexGrow: 1,
    width: 0,
    paddingLeft: 20,
    marginLeft: 120,
    marginBottom: 30,
  },
  imageContainer: {
    flex: 0.1,
  },
  bookImage: {
    flex: 1,
    width: 120,
    height: 120,
    aspectRatio: 1,
    borderRadius: 15,
    resizeMode: "contain",
  },
  progressPercent: {
    color: "#BA6400",
    fontFamily: "nunito-sans-regular",
    marginLeft: 15,
    alignSelf: "flex-end",
  },
});
