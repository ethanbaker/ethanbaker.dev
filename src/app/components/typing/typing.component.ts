import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of, interval, concat, Subscriber } from 'rxjs';
import { switchMap, map, take, concatMap, delay } from 'rxjs/operators';

/**
 * Typing component creates a typing effect on the homepage screen
 */
@Component({
  selector: 'app-typing',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit {
  /** Prefix for sentences that will not change */
  public prefix: string = "I am a";

  /** Current text in the component */
  public text: string = "";

  /** Sentences to render */
  private _sentences: string[] = [
    " forever-learner.",
    " passionate developer.",
    " problem solver.",
    " curious autodidact.",
    " puzzle enthusiast.",
  ];

  /** Delay in milliseconds for typing out a character */
  private _typingDelay = 175;

  /** Delay in milliseconds for deleting out a character */
  private _deleteDelay = 100;

  /** Delay in milliseconds for changing sentence */
  private _sentenceDelay = 3000;

  /**
   * When the component loads, start the typing animation
   */
  async ngOnInit(): Promise<void> {
    for (let index = 0; true; index = (index + 1) % this._sentences.length) {
      await this._typeSentence(this._sentences[index]);
      await this._delay(this._sentenceDelay);
      await this._deleteSentence(this._sentences[index]);
    }
  }

  /**
   * Type out a sentence using an observable
   * 
   * @param sentence The sentence to write
   * @returns An observable with the currently-being-written sentence
   */
  private async _typeSentence(sentence: string): Promise<void> {
    return new Promise((resolve, _) => {
      let index = 0;

      // Create an interval to type out the sentence
      const ref = setInterval(() => {
        // Keep adding letters
        this.text = sentence.substring(0, ++index);

        // If we've reached the end of the sentence stop the interval and complete the observable
        if (index === sentence.length) {
          clearInterval(ref);
          resolve();
        }
      }, this._typingDelay);
    });
  }

  /**
   * Delete a sentence using an observable 
   * 
   * @returns An observable with the currently-being-deleted sentence
   */
  private _deleteSentence(sentence: string): Promise<void> {
    return new Promise((resolve, _) => {
      let index = sentence.length || 0;

      // Create an interval to delete the sentence
      const intervalId = setInterval(() => {
        // Keep deleting letters
        this.text = sentence.substring(0, --index) || '';

        // If we've deleted the sentence, add it back to the end of sentences
        if (index < 0) {
          clearInterval(intervalId);
          resolve();
        }
      }, this._deleteDelay);
    });
  }

  /**
   * Delay for a given amount of time 
   * 
   * @param ms Amount of time to delay in milliseconds
   * @returns A promise that resolves after ms
   */
  private _delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  } 
}
