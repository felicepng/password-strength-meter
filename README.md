# Password Strength Meter
This application measures the strength of user passwords, using multiple techniques - password entropy & character matching.

## Password Entropy
Measures the strength of the password using character pools as shown below
| Pool              | Elements                         | Pool Size |
| ----------------- | -------------------------------- | --------- |
| Lowercase Letters | a-z                              | 26        |
| Uppercase Letters | A-Z                              | 26        |
| Digits            | 0 -9                             | 10        |
| Special Symbols   | `~!@#$%^&*()-=_+[{]}\|;':",.<>/? | 32        |

An entropy is computed using the following formula - `E = log(R^L) = L*log(R)`, where log base 2 is used, L represents the length of the password, R representing the pool size. For instance, the string P@55w0rd with a length of 8 (L = 8) contains a pool size of 94 (R = 94) since it contains characters from each of the pool, we're able to obtain an entropy of log(94^8) = 52.4. With an entropy of 52.4, we're able to compute the number of guesses = 2^(52.4) = 5.94*10^15.

## Character Matching
The following techniques are referenced from an open-sourced library - [zxcvbn](https://github.com/trichards57/zxcvbn)
  
**Dictionary Match**
> Utilises a bruteforce approach to match for tokens in the password using generic passwords (*i.e. admin, root*), common first & last names (*i.e. James, Mary*), common english words (*i.e. story, social, together*), inverted words (*i.e. password -> drowssap*), L33t words (*i.e. p@55w0rd*)
  
**Spatial Match**
> Detect common keypad patterns and promixty by searching for adjacent characters using a precomputed graph (*i.e. asdfvbnm*). Supports both QWERTY & DVORAK keyboard layouts.
  
**Repeat Match**
> Identifies consecutive repeated characters in a string using regular expressions (*i.e. Lazy & Greedy matching*)
  
**Seqeunce Match**
> Finds sequences by looking for repeated differences (delta) in unicode code point. (*i.e. abcd -> delta of 1 is detected, aceg -> delta of 2 is detected*)
  
**Date Match**
> Identifies date patterns in strings, checking for possible dates with and without separators by performing regular expressions against every substring of the password

## Analysis of Techniques
| Password Entropy                                                                                        | Character Matching                                                                                                           |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Faster** due to simple computation (*length and pool size*)                                           | **Slower** due to various underlying techniques (*i.e. dictionary matching that required precomputation of a large dataset*) |
| **Does not require** precomputed dataset to be effective                                                | **Requires a sufficiently large precomputed dataset** to be effective                                                        |
| **Does not take into account** common passwords and password patterns, vulnerable to dictionary attacks | More secure due to **coverage of common passwords**, stronger against dictionary attacks                                     |

## Takeaways
- Password entropy prioritises speed and saving space over security
- Character matching prioritises security over speed and saving space
- Combine both techiniques to leverage the strengths to achieve a balanced result

## Contributors
- [Daryl Wong](https://github.com/wongdaryl)
- [Felice Png](https://github.com/felicepng)
- [Jerald Lim](https://github.com/jeraldlyh)
- [Yvonne Lim](https://github.com/yvonnelhs)