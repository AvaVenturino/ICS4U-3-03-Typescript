/**
* This program generates 250 random numbers in an array
* and allows the user to search the array for a number.
*
* @author  Ava Venturino
* @version 0.5
* @since   2020-09-01
*/

import { createPrompt } from 'bun-promptx'

class BinarySearch {
  private constructor() {
    // Prevent instantiation
    throw new Error("Cannot be instantiated");
  }

  // Binary search function
  static binarySearch(userArray: number[], userNumber: number,
                      lowIndex: number, highIndex: number): number {
    let rValue: number = -1;
    if (lowIndex <= highIndex) {
      const midIndex: number = Math.floor((lowIndex + highIndex) / 2);
      if (userArray[midIndex] === userNumber) {
        rValue = midIndex;
      } else if (userArray[midIndex] > userNumber) {
        rValue = BinarySearch.binarySearch(userArray, userNumber, lowIndex, midIndex - 1);
      } else {
        rValue = BinarySearch.binarySearch(userArray, userNumber, midIndex + 1, highIndex);
      }
    }
    return rValue;
  }

  // Main function
  public static main(args: string[]): void {
    console.log("Binary Search Program");
    try {
      // Initializing the random class
      const randNumber: Random = new Random();

      // Initializing array of numbers
      const ARRAY_SIZE: number = 250;
      const MAX: number = 999;
      const randomNumberArray: number[] = new Array(ARRAY_SIZE);

      // Adding numbers to the array
      for (let counter = 0; counter < randomNumberArray.length; counter++) {
        randomNumberArray[counter] = randNumber.nextInt(MAX) + 1;
      }

      // Sorting the array
      const numberArray: number[] = [...randomNumberArray].sort((a, b) => a - b);

      console.log("\nSorted list of numbers:\n");
      console.log(numberArray.map(element => element.toString().padStart(3, '0')).join(", "));
      console.log("\n");

      // Getting user input as to what number they wish to search for
      const userInput: Scanner = new Scanner();
      console.log("What number are you searching for in the array (integer between 0 and 999): ");
      const searchNumber: number = userInput.nextInt();
      userInput.close();
      console.log();

      // Ensuring the user inputs an appropriate integer
      if (searchNumber > 999 || searchNumber < 0) {
        throw new Error();
      } else {
        // Using binary search to find the user's chosen number in the array
        const searchResult: number = BinarySearch.binarySearch(numberArray, searchNumber,
                                          0, numberArray.length - 1);

        // Outputting the results of the search
        console.log();
        console.log("Your number is in index: " + searchResult);
      }

      // Catches and tells the user that an error occurred
    } catch (e) {
      console.log();
      console.log("ERROR: Invalid Input");
    }
  }
}

// Entry point
BinarySearch.main([]);
console.log("\nDone.");

