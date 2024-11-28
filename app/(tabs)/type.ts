import { CATEGORY } from '../constants'

export interface Cloth {
    category: CATEGORY
    color: string
    image: string
    occasion: string
    season: string
    id: number
    name: string
}

export interface SuggestionResponse {
    reasoning: string
    outfit: {
        category: CATEGORY
        image: string
    }[]
}