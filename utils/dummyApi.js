import AsyncStorage from '@react-native-community/async-storage'
import { DECKS_STORAGE_KEY, formatResults } from './_Data';

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            return formatResults(results);
        })
}

export function addDeck(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }));
}

export function addToDeck(title, question, answer) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const card = JSON.parse(results)[title];

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [card.title]: {
                    title: card.title,
                    questions: [...card.questions, { question, answer }]
                }
            }));
        });
}