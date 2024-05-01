/**
* This program generates 250 random numbers in an array
* and allows the user to search the array for a number.
*
* @author  Ava Venturino
* @version 0.5
* @since   2020-09-01
*/

import { createPrompt } from 'bun-promptx'
const MIN = 0
const MAX = 999
const ARRAY_SIZE = 50

function binarySearch(userArray: number[], userNumber: number,
  lowIndex: number, highIndex: number) {
    let rVal: number = -1
    if (lowIndex <= highIndex) {
      let midIndex: number = Math.floor((lowIndex + highIndex) / 2)
      if (userArray[midIndex] == userNumber) {
        rVal = midIndex
      } else if (userArray[midIndex] > userNumber) {
        rVal = binarySearch(userArray, userNumber, lowIndex, midIndex - 1)
      } else {
        rVal = binarySearch(userArray, userNumber, midIndex + 1, highIndex)
      }
    }
    return rVal
  }

  let numberArray: number[] = []

  for (let i = 0; i < ARRAY_SIZE; i++) {
    numberArray[i] = Math.floor(Math.random() * (MAX + 1))
  }

  numberArray = numberArray.sort((a, b) => a - b)

  console.log("\nSorted list of numbers:\n")
  console.log(numberArray)

  try {
    const userInput = createPrompt(
      `What number are you searching for in the array? (integer between 0 and 999): `
    )
    let inputInt = parseInt(userInput.value)
    if (inputInt > MAX || inputInt < MIN) {
      throw Error()
    }
      console.log(`Returned = ${binarySearch(numberArray, inputInt, 0, numberArray.length - 1)}`)
    } catch {
      console.log(`Invalid input.`)
    }
console.log("\nDone.")
