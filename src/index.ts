// @ts-expect-error TODO: Type SDK
import { Launch } from '@lightningjs/sdk'
import App from './App.js'

export default function(...args: any[]) {
    return Launch(App, ...args)
}