
// package com.vestaboard.kmm

// data class FormatRequest(
//     val text: String,
//     val rows: Int,
//     val cols: Int,
//     val truncate: Boolean = true,
//     val extraHPadding: Int = 0
// )

// sealed class FormatResponse
// data class FormatSuccessResponse(
//     val characters: Layout,
//     val totalCharacters: Int,
//     val usedCharacters: Int
// ) : FormatResponse()

// sealed class FormatErrorResponse : FormatResponse()

// interface IFormatter {
//     fun format(request: FormatRequest): FormatResponse
// }

// sealed class FormatComponent
// data class ParsedMessage(val components: List<FormatComponent>)
// data class WrappedWord(val characters: List<VestaboardCharacter>)
// data class WrappedLine(val words: List<WrappedWord>)

// fun List<WrappedWord>.requiredCharacters() =
//     this.map { it.characters.size }.sum().plus(this.size - 1)

// class DefaultFormatter : IFormatter {
//     private val REGEX = "\\{(.*?)\\}|(.)".toRegex()

//     override fun format(request: FormatRequest): FormatResponse {
//         val lines = request.text.split("\n")
//             .map { REGEX.findAll(it) }
//             .map {
//                 it
//                     .map {
//                         when {
//                             (it.value.startsWith("{") && it.value.endsWith("}")) ->
//                                 it
//                                     .groupValues
//                                     .get(1)
//                                     .toInt()
//                                     .let { VestaboardCharacterCode(it) }.asVestaboardCharacter()
//                             else -> it
//                                 .value
//                                 .first()
//                                 .asVestaboardCharacter()
//                         }
//                     }
//                     .toList()
//             }
//             .toList()
//             .map {
//                 WrappedLine(
//                     it.let {
//                         val words = mutableListOf<WrappedWord>()
//                         val word = mutableListOf<VestaboardCharacter>()
//                         for (i in 0..(it.size - 1)) {
//                             val char = it.get(i)
//                             if (char == VestaboardCharacter.Blank) {
//                                 words.add(WrappedWord(word.toList()))
//                                 word.clear()
//                             } else {
//                                 word.add(it.get(i))
//                             }
//                         }

//                         words.add(WrappedWord(word.toList()))
//                         words
//                     }
//                 )
//             }

//         val contentAreaWidth = request.cols - request.extraHPadding

//         fun makeLines(c: List<WrappedWord>): List<WrappedLine> {
//             val words =
//                 c.map { it.characters.chunked(contentAreaWidth) }.flatten().map { WrappedWord(it) }

//             if (words.requiredCharacters() <= contentAreaWidth) return listOf(WrappedLine(words))

//             for (index in 0..words.size) {
//                 val sublist = words.subList(0, index)

//                 if (sublist.requiredCharacters() > contentAreaWidth) {
//                     return listOf(
//                         WrappedLine(
//                             words.subList(
//                                 0,
//                                 index - 1
//                             )
//                         )
//                     ) + makeLines(words.subList(index - 1, words.size))
//                 }
//             }

//             return listOf()
//         }

//         val wrapping = lines.map { makeLines(it.words) }.flatten()

//         val chars = getEmptyLayout(request.rows, request.cols)

//         val formatted = wrapping.map {
//             WrappedLine(it.words.intersperse(WrappedWord(listOf(VestaboardCharacter.Blank))))
//         }

//         val numContentRows = formatted.size

//         when (numContentRows) {
//             0, 1, 2 -> {}
//             3 -> {
//                 if (request.extraHPadding == 0) {
//                     return format(request.copy(extraHPadding = request.extraHPadding + 4))
//                 }
//             }
//         }

//         val maxNumContentColumns =
//             formatted.map { it.words.map { it.characters.size }.sum() }.max() ?: 0

//         val hPad = listOf((request.cols - maxNumContentColumns) / 2, 0).max() ?: 0
//         val vPad = listOf((request.rows - numContentRows) / 2, 0).max() ?: 0

//         val emptyRow =
//             MutableList(request.cols) { VestaboardCharacter.Blank }.toList()
//                 .map { WrappedWord(listOf(it)) }
//         val emptyRowPaddings = MutableList(vPad) { WrappedLine(emptyRow) }.toList()
//         val hPaddings =
//             MutableList(hPad) { WrappedWord(listOf(VestaboardCharacter.Blank)) }.toList()

//         val padded = emptyRowPaddings + formatted.map {
//             WrappedLine(hPaddings + it.words + hPaddings)
//         } + emptyRowPaddings

//         padded.take(request.rows).forEachIndexed { row, line ->
//             line.words.map { it.characters }.flatten().take(request.cols)
//                 .forEachIndexed { column, character ->
//                     chars[row][column] = character.asCharacterCode().get()
//                 }
//         }

//         val layout = Layout(characters = chars.map { row -> row.toList() }.toList())
//         val totalCharsAvailable = request.rows * request.cols
//         val usedChars = countCharacters(request.text, request.cols)

//         return FormatSuccessResponse(layout, totalCharsAvailable, usedChars)
//     }
// }

// fun WrappedLine.count() = this.words.map { it.characters.count() }.sum() - 1

// fun VestaboardCharacter.asAppPreviewCharacter(): String? {
//     return when (this) {
//         VestaboardCharacter.Blank -> " "
//         VestaboardCharacter.A -> "A"
//         VestaboardCharacter.B -> "B"
//         VestaboardCharacter.C -> "C"
//         VestaboardCharacter.D -> "D"
//         VestaboardCharacter.E -> "E"
//         VestaboardCharacter.F -> "F"
//         VestaboardCharacter.G -> "G"
//         VestaboardCharacter.H -> "H"
//         VestaboardCharacter.I -> "I"
//         VestaboardCharacter.J -> "J"
//         VestaboardCharacter.K -> "K"
//         VestaboardCharacter.L -> "L"
//         VestaboardCharacter.M -> "M"
//         VestaboardCharacter.N -> "N"
//         VestaboardCharacter.O -> "O"
//         VestaboardCharacter.P -> "P"
//         VestaboardCharacter.Q -> "Q"
//         VestaboardCharacter.R -> "R"
//         VestaboardCharacter.S -> "S"
//         VestaboardCharacter.T -> "T"
//         VestaboardCharacter.U -> "U"
//         VestaboardCharacter.V -> "V"
//         VestaboardCharacter.W -> "W"
//         VestaboardCharacter.X -> "X"
//         VestaboardCharacter.Y -> "Y"
//         VestaboardCharacter.Z -> "Z"
//         VestaboardCharacter.One -> "1"
//         VestaboardCharacter.Two -> "2"
//         VestaboardCharacter.Three -> "3"
//         VestaboardCharacter.Four -> "4"
//         VestaboardCharacter.Five -> "5"
//         VestaboardCharacter.Six -> "6"
//         VestaboardCharacter.Seven -> "7"
//         VestaboardCharacter.Eight -> "8"
//         VestaboardCharacter.Nine -> "9"
//         VestaboardCharacter.Zero -> "0"
//         VestaboardCharacter.ExclamationMark -> "!"
//         VestaboardCharacter.AtSign -> "@"
//         VestaboardCharacter.PoundSign -> "#"
//         VestaboardCharacter.DollarSign -> "$"
//         VestaboardCharacter.LeftParen -> "("
//         VestaboardCharacter.RightParen -> ")"
//         VestaboardCharacter.Hyphen -> "-"
//         VestaboardCharacter.PlusSign -> "+"
//         VestaboardCharacter.Ampersand -> "&"
//         VestaboardCharacter.EqualsSign -> "="
//         VestaboardCharacter.Semicolon -> ";"
//         VestaboardCharacter.Colon -> ":"
//         VestaboardCharacter.SingleQuote -> "\'"
//         VestaboardCharacter.DoubleQuote -> "\""
//         VestaboardCharacter.PercentSign -> "%"
//         VestaboardCharacter.Comma -> ","
//         VestaboardCharacter.Period -> "."
//         VestaboardCharacter.Slash -> "/"
//         VestaboardCharacter.QuestionMark -> "?"
//         VestaboardCharacter.DegreeSign -> "°"
//         else -> "{${this.asCharacterCode().get()}}"
//     }
// }

// fun VestaboardCharacter.asJavaScriptCharacter(): Char? {
//     return when (this) {
//         VestaboardCharacter.Blank -> ' '
//         VestaboardCharacter.A -> 'A'
//         VestaboardCharacter.B -> 'B'
//         VestaboardCharacter.C -> 'C'
//         VestaboardCharacter.D -> 'D'
//         VestaboardCharacter.E -> 'E'
//         VestaboardCharacter.F -> 'F'
//         VestaboardCharacter.G -> 'G'
//         VestaboardCharacter.H -> 'H'
//         VestaboardCharacter.I -> 'I'
//         VestaboardCharacter.J -> 'J'
//         VestaboardCharacter.K -> 'K'
//         VestaboardCharacter.L -> 'L'
//         VestaboardCharacter.M -> 'M'
//         VestaboardCharacter.N -> 'N'
//         VestaboardCharacter.O -> 'O'
//         VestaboardCharacter.P -> 'P'
//         VestaboardCharacter.Q -> 'Q'
//         VestaboardCharacter.R -> 'R'
//         VestaboardCharacter.S -> 'S'
//         VestaboardCharacter.T -> 'T'
//         VestaboardCharacter.U -> 'U'
//         VestaboardCharacter.V -> 'V'
//         VestaboardCharacter.W -> 'W'
//         VestaboardCharacter.X -> 'X'
//         VestaboardCharacter.Y -> 'Y'
//         VestaboardCharacter.Z -> 'Z'
//         VestaboardCharacter.One -> '1'
//         VestaboardCharacter.Two -> '2'
//         VestaboardCharacter.Three -> '3'
//         VestaboardCharacter.Four -> '4'
//         VestaboardCharacter.Five -> '5'
//         VestaboardCharacter.Six -> '6'
//         VestaboardCharacter.Seven -> '7'
//         VestaboardCharacter.Eight -> '8'
//         VestaboardCharacter.Nine -> '9'
//         VestaboardCharacter.Zero -> '0'
//         VestaboardCharacter.ExclamationMark -> '!'
//         VestaboardCharacter.AtSign -> '@'
//         VestaboardCharacter.PoundSign -> '#'
//         VestaboardCharacter.DollarSign -> '$'
//         VestaboardCharacter.LeftParen -> '('
//         VestaboardCharacter.RightParen -> ')'
//         VestaboardCharacter.Hyphen -> '-'
//         VestaboardCharacter.PlusSign -> '+'
//         VestaboardCharacter.Ampersand -> '&'
//         VestaboardCharacter.EqualsSign -> '='
//         VestaboardCharacter.Semicolon -> ';'
//         VestaboardCharacter.Colon -> ':'
//         VestaboardCharacter.SingleQuote -> '\''
//         VestaboardCharacter.DoubleQuote -> '"'
//         VestaboardCharacter.PercentSign -> '%'
//         VestaboardCharacter.Comma -> ','
//         VestaboardCharacter.Period -> '.'
//         VestaboardCharacter.Slash -> '/'
//         VestaboardCharacter.QuestionMark -> '?'
//         VestaboardCharacter.DegreeSign -> '°'
//         else -> null
//     }
// }

// fun VestaboardCharacterCode.asVestaboardCharacter(): VestaboardCharacter {
//     return when (this) {
//         VestaboardCharacterCode(0) -> VestaboardCharacter.Blank
//         VestaboardCharacterCode(1) -> VestaboardCharacter.A
//         VestaboardCharacterCode(2) -> VestaboardCharacter.B
//         VestaboardCharacterCode(3) -> VestaboardCharacter.C
//         VestaboardCharacterCode(4) -> VestaboardCharacter.D
//         VestaboardCharacterCode(5) -> VestaboardCharacter.E
//         VestaboardCharacterCode(6) -> VestaboardCharacter.F
//         VestaboardCharacterCode(7) -> VestaboardCharacter.G
//         VestaboardCharacterCode(8) -> VestaboardCharacter.H
//         VestaboardCharacterCode(9) -> VestaboardCharacter.I
//         VestaboardCharacterCode(10) -> VestaboardCharacter.J
//         VestaboardCharacterCode(11) -> VestaboardCharacter.K
//         VestaboardCharacterCode(12) -> VestaboardCharacter.L
//         VestaboardCharacterCode(13) -> VestaboardCharacter.M
//         VestaboardCharacterCode(14) -> VestaboardCharacter.N
//         VestaboardCharacterCode(15) -> VestaboardCharacter.O
//         VestaboardCharacterCode(16) -> VestaboardCharacter.P
//         VestaboardCharacterCode(17) -> VestaboardCharacter.Q
//         VestaboardCharacterCode(18) -> VestaboardCharacter.R
//         VestaboardCharacterCode(19) -> VestaboardCharacter.S
//         VestaboardCharacterCode(20) -> VestaboardCharacter.T
//         VestaboardCharacterCode(21) -> VestaboardCharacter.U
//         VestaboardCharacterCode(22) -> VestaboardCharacter.V
//         VestaboardCharacterCode(23) -> VestaboardCharacter.W
//         VestaboardCharacterCode(24) -> VestaboardCharacter.X
//         VestaboardCharacterCode(25) -> VestaboardCharacter.Y
//         VestaboardCharacterCode(26) -> VestaboardCharacter.Z
//         VestaboardCharacterCode(27) -> VestaboardCharacter.One
//         VestaboardCharacterCode(28) -> VestaboardCharacter.Two
//         VestaboardCharacterCode(29) -> VestaboardCharacter.Three
//         VestaboardCharacterCode(30) -> VestaboardCharacter.Four
//         VestaboardCharacterCode(31) -> VestaboardCharacter.Five
//         VestaboardCharacterCode(32) -> VestaboardCharacter.Six
//         VestaboardCharacterCode(33) -> VestaboardCharacter.Seven
//         VestaboardCharacterCode(34) -> VestaboardCharacter.Eight
//         VestaboardCharacterCode(35) -> VestaboardCharacter.Nine
//         VestaboardCharacterCode(36) -> VestaboardCharacter.Zero
//         VestaboardCharacterCode(37) -> VestaboardCharacter.ExclamationMark
//         VestaboardCharacterCode(38) -> VestaboardCharacter.AtSign
//         VestaboardCharacterCode(39) -> VestaboardCharacter.PoundSign
//         VestaboardCharacterCode(40) -> VestaboardCharacter.DollarSign
//         VestaboardCharacterCode(41) -> VestaboardCharacter.LeftParen
//         VestaboardCharacterCode(42) -> VestaboardCharacter.RightParen
//         VestaboardCharacterCode(44) -> VestaboardCharacter.Hyphen
//         VestaboardCharacterCode(46) -> VestaboardCharacter.PlusSign
//         VestaboardCharacterCode(47) -> VestaboardCharacter.Ampersand
//         VestaboardCharacterCode(48) -> VestaboardCharacter.EqualsSign
//         VestaboardCharacterCode(49) -> VestaboardCharacter.Semicolon
//         VestaboardCharacterCode(50) -> VestaboardCharacter.Colon
//         VestaboardCharacterCode(52) -> VestaboardCharacter.SingleQuote
//         VestaboardCharacterCode(53) -> VestaboardCharacter.DoubleQuote
//         VestaboardCharacterCode(54) -> VestaboardCharacter.PercentSign
//         VestaboardCharacterCode(55) -> VestaboardCharacter.Comma
//         VestaboardCharacterCode(56) -> VestaboardCharacter.Period
//         VestaboardCharacterCode(59) -> VestaboardCharacter.Slash
//         VestaboardCharacterCode(60) -> VestaboardCharacter.QuestionMark
//         VestaboardCharacterCode(62) -> VestaboardCharacter.DegreeSign
//         VestaboardCharacterCode(63) -> VestaboardCharacter.PoppyRed
//         VestaboardCharacterCode(64) -> VestaboardCharacter.Orange
//         VestaboardCharacterCode(65) -> VestaboardCharacter.Yellow
//         VestaboardCharacterCode(66) -> VestaboardCharacter.Green
//         VestaboardCharacterCode(67) -> VestaboardCharacter.ParisBlue
//         VestaboardCharacterCode(68) -> VestaboardCharacter.Violet
//         VestaboardCharacterCode(69) -> VestaboardCharacter.White
//         VestaboardCharacterCode(70) -> VestaboardCharacter.Black
//         // else -> throw Error("unexpected - unknown character code - ${this}")
//         else -> VestaboardCharacter.Blank
//     }
// }

// fun VestaboardCharacter.asColorCode() =
//     when (this) {
//         VestaboardCharacter.PoppyRed -> "#DA291C"
//         VestaboardCharacter.Orange -> "#FF7500"
//         VestaboardCharacter.Yellow -> "#FFB81C"
//         VestaboardCharacter.Green -> "#009A44"
//         VestaboardCharacter.ParisBlue -> "#0084D5"
//         VestaboardCharacter.Violet -> "#702F8A"
//         VestaboardCharacter.White -> "#FFFFFF"
//         VestaboardCharacter.Black -> "#141414"
//         else -> null
//     }

// fun Char.asVestaboardCharacter(): VestaboardCharacter {
//     val character = this

//     return when (character.toUpperCase()) {
//         ' ' -> VestaboardCharacter.Blank
//         'A' -> VestaboardCharacter.A
//         'B' -> VestaboardCharacter.B
//         'C' -> VestaboardCharacter.C
//         'D' -> VestaboardCharacter.D
//         'E' -> VestaboardCharacter.E
//         'F' -> VestaboardCharacter.F
//         'G' -> VestaboardCharacter.G
//         'H' -> VestaboardCharacter.H
//         'I' -> VestaboardCharacter.I
//         'J' -> VestaboardCharacter.J
//         'K' -> VestaboardCharacter.K
//         'L' -> VestaboardCharacter.L
//         'M' -> VestaboardCharacter.M
//         'N' -> VestaboardCharacter.N
//         'O' -> VestaboardCharacter.O
//         'P' -> VestaboardCharacter.P
//         'Q' -> VestaboardCharacter.Q
//         'R' -> VestaboardCharacter.R
//         'S' -> VestaboardCharacter.S
//         'T' -> VestaboardCharacter.T
//         'U' -> VestaboardCharacter.U
//         'V' -> VestaboardCharacter.V
//         'W' -> VestaboardCharacter.W
//         'X' -> VestaboardCharacter.X
//         'Y' -> VestaboardCharacter.Y
//         'Z' -> VestaboardCharacter.Z
//         '1' -> VestaboardCharacter.One
//         '2' -> VestaboardCharacter.Two
//         '3' -> VestaboardCharacter.Three
//         '4' -> VestaboardCharacter.Four
//         '5' -> VestaboardCharacter.Five
//         '6' -> VestaboardCharacter.Six
//         '7' -> VestaboardCharacter.Seven
//         '8' -> VestaboardCharacter.Eight
//         '9' -> VestaboardCharacter.Nine
//         '0' -> VestaboardCharacter.Zero
//         '!' -> VestaboardCharacter.ExclamationMark
//         '@' -> VestaboardCharacter.AtSign
//         '#' -> VestaboardCharacter.PoundSign
//         '$' -> VestaboardCharacter.DollarSign
//         '(' -> VestaboardCharacter.LeftParen
//         ')' -> VestaboardCharacter.RightParen
//         '-' -> VestaboardCharacter.Hyphen
//         '+' -> VestaboardCharacter.PlusSign
//         '&' -> VestaboardCharacter.Ampersand
//         '=' -> VestaboardCharacter.EqualsSign
//         ';' -> VestaboardCharacter.Semicolon
//         ':' -> VestaboardCharacter.Colon
//         '\'' -> VestaboardCharacter.SingleQuote
//         '"' -> VestaboardCharacter.DoubleQuote
//         '%' -> VestaboardCharacter.PercentSign
//         ',' -> VestaboardCharacter.Comma
//         '.' -> VestaboardCharacter.Period
//         '/' -> VestaboardCharacter.Slash
//         '?' -> VestaboardCharacter.QuestionMark
//         '°' -> VestaboardCharacter.DegreeSign
//         '\\' -> VestaboardCharacter.Slash
//         '—' -> VestaboardCharacter.Hyphen
//         '‘' -> VestaboardCharacterCode(52).asVestaboardCharacter()
//         '’' -> VestaboardCharacterCode(52).asVestaboardCharacter()
//         '`' -> VestaboardCharacterCode(52).asVestaboardCharacter()
//         '´' -> VestaboardCharacterCode(52).asVestaboardCharacter()
//         '–' -> VestaboardCharacterCode(44).asVestaboardCharacter()
//         '¯' -> VestaboardCharacterCode(44).asVestaboardCharacter()
//         '~' -> VestaboardCharacterCode(44).asVestaboardCharacter()
//         '¸' -> VestaboardCharacterCode(55).asVestaboardCharacter()
//         '¦' -> VestaboardCharacterCode(50).asVestaboardCharacter()
//         '¿' -> VestaboardCharacterCode(60).asVestaboardCharacter()
//         '„' -> VestaboardCharacterCode(53).asVestaboardCharacter()
//         '“' -> VestaboardCharacterCode(53).asVestaboardCharacter()
//         '”' -> VestaboardCharacterCode(53).asVestaboardCharacter()
//         '¨' -> VestaboardCharacterCode(53).asVestaboardCharacter()
//         '[' -> VestaboardCharacterCode(41).asVestaboardCharacter()
//         '{' -> VestaboardCharacterCode(41).asVestaboardCharacter()
//         ']' -> VestaboardCharacterCode(42).asVestaboardCharacter()
//         '}' -> VestaboardCharacterCode(42).asVestaboardCharacter()
//         '‰' -> VestaboardCharacterCode(54).asVestaboardCharacter()
//         '¤' -> VestaboardCharacterCode(62).asVestaboardCharacter()
//         '•' -> VestaboardCharacterCode(62).asVestaboardCharacter()
//         '·' -> VestaboardCharacterCode(62).asVestaboardCharacter()
//         'â' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'ä' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'à' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'å' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'á' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'À' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'Á' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'Â' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'Ã' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'Ä' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'Å' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         'ã' -> VestaboardCharacterCode(1).asVestaboardCharacter()
//         '©' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '®' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '<' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '>' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '²' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '†' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '‡' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         'ˆ' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         'Þ' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         'þ' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         'µ' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '¶' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '*' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '^' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '_' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '¬' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '«' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '»' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         'ß' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '›' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '³' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '¹' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '€' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '‹' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '˜' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         '÷' -> VestaboardCharacterCode(0).asVestaboardCharacter()
//         'ç' -> VestaboardCharacterCode(3).asVestaboardCharacter()
//         'Ç' -> VestaboardCharacterCode(3).asVestaboardCharacter()
//         '¢' -> VestaboardCharacterCode(3).asVestaboardCharacter()
//         'Ð' -> VestaboardCharacterCode(4).asVestaboardCharacter()
//         'é' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'ê' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'ë' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'è' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'È' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'É' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'Ê' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'Ë' -> VestaboardCharacterCode(5).asVestaboardCharacter()
//         'ƒ' -> VestaboardCharacterCode(6).asVestaboardCharacter()
//         'í' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'ï' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'î' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'ì' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'Ì' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'Í' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'Î' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         'Ï' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         '|' -> VestaboardCharacterCode(9).asVestaboardCharacter()
//         '£' -> VestaboardCharacterCode(12).asVestaboardCharacter()
//         'ñ' -> VestaboardCharacterCode(14).asVestaboardCharacter()
//         'Ñ' -> VestaboardCharacterCode(14).asVestaboardCharacter()
//         'ó' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'ô' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'ö' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'ò' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'Ò' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'Ó' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'Ô' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'Õ' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'Ö' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'Ø' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'ð' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'õ' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         'ø' -> VestaboardCharacterCode(15).asVestaboardCharacter()
//         '±' -> VestaboardCharacterCode(46).asVestaboardCharacter()
//         'š' -> VestaboardCharacterCode(19).asVestaboardCharacter()
//         'Š' -> VestaboardCharacterCode(19).asVestaboardCharacter()
//         '§' -> VestaboardCharacterCode(19).asVestaboardCharacter()
//         'û' -> VestaboardCharacterCode(21).asVestaboardCharacter()
//         'ù' -> VestaboardCharacterCode(21).asVestaboardCharacter()
//         'ú' -> VestaboardCharacterCode(21).asVestaboardCharacter()
//         'Ù' -> VestaboardCharacterCode(21).asVestaboardCharacter()
//         'Ú' -> VestaboardCharacterCode(21).asVestaboardCharacter()
//         'Û' -> VestaboardCharacterCode(21).asVestaboardCharacter()
//         'ğ' -> VestaboardCharacterCode(7).asVestaboardCharacter()
//         else -> VestaboardCharacter.Blank
//     }
// }

// fun VestaboardCharacterSequence(vararg chars: Int) =
//     chars.toList().map { VestaboardCharacterCode(it).asVestaboardCharacter() }

// val SPECIAL_CHARACTERS = mapOf(
//     Pair('½', VestaboardCharacterSequence(27, 59, 28)),
//     Pair('¼', VestaboardCharacterSequence(27, 59, 30)),
//     Pair('¾', VestaboardCharacterSequence(29, 59, 30)),
//     Pair('‘', VestaboardCharacterSequence(52)),
//     Pair('’', VestaboardCharacterSequence(52)),
//     Pair('`', VestaboardCharacterSequence(52)),
//     Pair('´', VestaboardCharacterSequence(52)),
//     Pair('–', VestaboardCharacterSequence(44)),
//     Pair('—', VestaboardCharacterSequence(44)),
//     Pair('¯', VestaboardCharacterSequence(44)),
//     Pair('~', VestaboardCharacterSequence(44)),
//     Pair('¸', VestaboardCharacterSequence(55)),
//     Pair('¦', VestaboardCharacterSequence(50)),
//     Pair('¿', VestaboardCharacterSequence(60)),
//     Pair('…', VestaboardCharacterSequence(56, 56, 56)),
//     Pair('„', VestaboardCharacterSequence(53)),
//     Pair('“', VestaboardCharacterSequence(53)),
//     Pair('”', VestaboardCharacterSequence(53)),
//     Pair('¨', VestaboardCharacterSequence(53)),
//     Pair('[', VestaboardCharacterSequence(41)),
//     Pair('{', VestaboardCharacterSequence(41)),
//     Pair(']', VestaboardCharacterSequence(42)),
//     Pair('}', VestaboardCharacterSequence(42)),
//     Pair('\\', VestaboardCharacterSequence(59)),
//     Pair('‰', VestaboardCharacterSequence(54)),
//     Pair('¤', VestaboardCharacterSequence(62)),
//     Pair('°', VestaboardCharacterSequence(62)),
//     Pair('•', VestaboardCharacterSequence(62)),
//     Pair('·', VestaboardCharacterSequence(62)),
//     Pair('â', VestaboardCharacterSequence(1)),
//     Pair('ä', VestaboardCharacterSequence(1, 5)),
//     Pair('à', VestaboardCharacterSequence(1)),
//     Pair('å', VestaboardCharacterSequence(1)),
//     Pair('á', VestaboardCharacterSequence(1)),
//     Pair('À', VestaboardCharacterSequence(1)),
//     Pair('Á', VestaboardCharacterSequence(1)),
//     Pair('Â', VestaboardCharacterSequence(1)),
//     Pair('Ã', VestaboardCharacterSequence(1)),
//     Pair('Ä', VestaboardCharacterSequence(1, 5)),
//     Pair('Å', VestaboardCharacterSequence(1)),
//     Pair('ã', VestaboardCharacterSequence(1)),
//     Pair('æ', VestaboardCharacterSequence(1, 5)),
//     Pair('Æ', VestaboardCharacterSequence(1, 5)),
//     Pair('©', VestaboardCharacterSequence(0)),
//     Pair('®', VestaboardCharacterSequence(0)),
//     Pair('<', VestaboardCharacterSequence(0)),
//     Pair('>', VestaboardCharacterSequence(0)),
//     Pair('²', VestaboardCharacterSequence(0)),
//     Pair('†', VestaboardCharacterSequence(0)),
//     Pair('‡', VestaboardCharacterSequence(0)),
//     Pair('ˆ', VestaboardCharacterSequence(0)),
//     Pair('Þ', VestaboardCharacterSequence(0)),
//     Pair('þ', VestaboardCharacterSequence(0)),
//     Pair('µ', VestaboardCharacterSequence(0)),
//     Pair('¶', VestaboardCharacterSequence(0)),
//     Pair('*', VestaboardCharacterSequence(0)),
//     Pair('^', VestaboardCharacterSequence(0)),
//     Pair('_', VestaboardCharacterSequence(0)),
//     Pair('¬', VestaboardCharacterSequence(0)),
//     Pair('«', VestaboardCharacterSequence(0)),
//     Pair('»', VestaboardCharacterSequence(0)),
//     Pair('ß', VestaboardCharacterSequence(19, 19)),
//     Pair('ß', VestaboardCharacterSequence(19, 19)),
//     Pair('›', VestaboardCharacterSequence(0)),
//     Pair('³', VestaboardCharacterSequence(0)),
//     Pair('¹', VestaboardCharacterSequence(0)),
//     Pair('€', VestaboardCharacterSequence(0)),
//     Pair('‹', VestaboardCharacterSequence(0)),
//     Pair('˜', VestaboardCharacterSequence(0)),
//     Pair('÷', VestaboardCharacterSequence(0)),
//     Pair('ç', VestaboardCharacterSequence(3)),
//     Pair('Ç', VestaboardCharacterSequence(3)),
//     Pair('¢', VestaboardCharacterSequence(3)),
//     Pair('Ð', VestaboardCharacterSequence(4)),
//     Pair('é', VestaboardCharacterSequence(5)),
//     Pair('ê', VestaboardCharacterSequence(5)),
//     Pair('ë', VestaboardCharacterSequence(5)),
//     Pair('è', VestaboardCharacterSequence(5)),
//     Pair('È', VestaboardCharacterSequence(5)),
//     Pair('É', VestaboardCharacterSequence(5)),
//     Pair('Ê', VestaboardCharacterSequence(5)),
//     Pair('Ë', VestaboardCharacterSequence(5)),
//     Pair('ƒ', VestaboardCharacterSequence(6)),
//     Pair('ğ', VestaboardCharacterSequence(7)),
//     Pair('í', VestaboardCharacterSequence(9)),
//     Pair('ï', VestaboardCharacterSequence(9)),
//     Pair('î', VestaboardCharacterSequence(9)),
//     Pair('ì', VestaboardCharacterSequence(9)),
//     Pair('Ì', VestaboardCharacterSequence(9)),
//     Pair('Í', VestaboardCharacterSequence(9)),
//     Pair('Î', VestaboardCharacterSequence(9)),
//     Pair('Ï', VestaboardCharacterSequence(9)),
//     Pair('|', VestaboardCharacterSequence(9)),
//     Pair('£', VestaboardCharacterSequence(12)),
//     Pair('ñ', VestaboardCharacterSequence(14)),
//     Pair('Ñ', VestaboardCharacterSequence(14)),
//     Pair('ó', VestaboardCharacterSequence(15)),
//     Pair('ô', VestaboardCharacterSequence(15)),
//     Pair('ö', VestaboardCharacterSequence(15, 5)),
//     Pair('ò', VestaboardCharacterSequence(15)),
//     Pair('Ò', VestaboardCharacterSequence(15)),
//     Pair('Ó', VestaboardCharacterSequence(15)),
//     Pair('Ô', VestaboardCharacterSequence(15)),
//     Pair('Õ', VestaboardCharacterSequence(15)),
//     Pair('Ö', VestaboardCharacterSequence(15, 5)),
//     Pair('Ø', VestaboardCharacterSequence(15)),
//     Pair('ð', VestaboardCharacterSequence(15)),
//     Pair('õ', VestaboardCharacterSequence(15)),
//     Pair('ø', VestaboardCharacterSequence(15)),
//     Pair('œ', VestaboardCharacterSequence(15, 5)),
//     Pair('Œ', VestaboardCharacterSequence(15, 5)),
//     Pair('±', VestaboardCharacterSequence(46)),
//     Pair('š', VestaboardCharacterSequence(19)),
//     Pair('Š', VestaboardCharacterSequence(19)),
//     Pair('§', VestaboardCharacterSequence(19)),
//     Pair('™', VestaboardCharacterSequence(20, 13)),
//     Pair('û', VestaboardCharacterSequence(21)),
//     Pair('ù', VestaboardCharacterSequence(21)),
//     Pair('ú', VestaboardCharacterSequence(21)),
//     Pair('Ù', VestaboardCharacterSequence(21)),
//     Pair('Ú', VestaboardCharacterSequence(21)),
//     Pair('Û', VestaboardCharacterSequence(21)),
//     Pair('Ü', VestaboardCharacterSequence(21, 5)),
//     Pair('ü', VestaboardCharacterSequence(21, 5))
// )

// fun VestaboardCharacter.asCharacterCode(): VestaboardCharacterCode {
//     return when (this) {
//         VestaboardCharacter.Blank -> VestaboardCharacterCode(0)
//         VestaboardCharacter.A -> VestaboardCharacterCode(1)
//         VestaboardCharacter.B -> VestaboardCharacterCode(2)
//         VestaboardCharacter.C -> VestaboardCharacterCode(3)
//         VestaboardCharacter.D -> VestaboardCharacterCode(4)
//         VestaboardCharacter.E -> VestaboardCharacterCode(5)
//         VestaboardCharacter.F -> VestaboardCharacterCode(6)
//         VestaboardCharacter.G -> VestaboardCharacterCode(7)
//         VestaboardCharacter.H -> VestaboardCharacterCode(8)
//         VestaboardCharacter.I -> VestaboardCharacterCode(9)
//         VestaboardCharacter.J -> VestaboardCharacterCode(10)
//         VestaboardCharacter.K -> VestaboardCharacterCode(11)
//         VestaboardCharacter.L -> VestaboardCharacterCode(12)
//         VestaboardCharacter.M -> VestaboardCharacterCode(13)
//         VestaboardCharacter.N -> VestaboardCharacterCode(14)
//         VestaboardCharacter.O -> VestaboardCharacterCode(15)
//         VestaboardCharacter.P -> VestaboardCharacterCode(16)
//         VestaboardCharacter.Q -> VestaboardCharacterCode(17)
//         VestaboardCharacter.R -> VestaboardCharacterCode(18)
//         VestaboardCharacter.S -> VestaboardCharacterCode(19)
//         VestaboardCharacter.T -> VestaboardCharacterCode(20)
//         VestaboardCharacter.U -> VestaboardCharacterCode(21)
//         VestaboardCharacter.V -> VestaboardCharacterCode(22)
//         VestaboardCharacter.W -> VestaboardCharacterCode(23)
//         VestaboardCharacter.X -> VestaboardCharacterCode(24)
//         VestaboardCharacter.Y -> VestaboardCharacterCode(25)
//         VestaboardCharacter.Z -> VestaboardCharacterCode(26)
//         VestaboardCharacter.One -> VestaboardCharacterCode(27)
//         VestaboardCharacter.Two -> VestaboardCharacterCode(28)
//         VestaboardCharacter.Three -> VestaboardCharacterCode(29)
//         VestaboardCharacter.Four -> VestaboardCharacterCode(30)
//         VestaboardCharacter.Five -> VestaboardCharacterCode(31)
//         VestaboardCharacter.Six -> VestaboardCharacterCode(32)
//         VestaboardCharacter.Seven -> VestaboardCharacterCode(33)
//         VestaboardCharacter.Eight -> VestaboardCharacterCode(34)
//         VestaboardCharacter.Nine -> VestaboardCharacterCode(35)
//         VestaboardCharacter.Zero -> VestaboardCharacterCode(36)
//         VestaboardCharacter.ExclamationMark -> VestaboardCharacterCode(37)
//         VestaboardCharacter.AtSign -> VestaboardCharacterCode(38)
//         VestaboardCharacter.PoundSign -> VestaboardCharacterCode(39)
//         VestaboardCharacter.DollarSign -> VestaboardCharacterCode(40)
//         VestaboardCharacter.LeftParen -> VestaboardCharacterCode(41)
//         VestaboardCharacter.RightParen -> VestaboardCharacterCode(42)
//         VestaboardCharacter.Hyphen -> VestaboardCharacterCode(44)
//         VestaboardCharacter.PlusSign -> VestaboardCharacterCode(46)
//         VestaboardCharacter.Ampersand -> VestaboardCharacterCode(47)
//         VestaboardCharacter.EqualsSign -> VestaboardCharacterCode(48)
//         VestaboardCharacter.Semicolon -> VestaboardCharacterCode(49)
//         VestaboardCharacter.Colon -> VestaboardCharacterCode(50)
//         VestaboardCharacter.SingleQuote -> VestaboardCharacterCode(52)
//         VestaboardCharacter.DoubleQuote -> VestaboardCharacterCode(53)
//         VestaboardCharacter.PercentSign -> VestaboardCharacterCode(54)
//         VestaboardCharacter.Comma -> VestaboardCharacterCode(55)
//         VestaboardCharacter.Period -> VestaboardCharacterCode(56)
//         VestaboardCharacter.Slash -> VestaboardCharacterCode(59)
//         VestaboardCharacter.QuestionMark -> VestaboardCharacterCode(60)
//         VestaboardCharacter.DegreeSign -> VestaboardCharacterCode(62)
//         VestaboardCharacter.PoppyRed -> VestaboardCharacterCode(63)
//         VestaboardCharacter.Orange -> VestaboardCharacterCode(64)
//         VestaboardCharacter.Yellow -> VestaboardCharacterCode(65)
//         VestaboardCharacter.Green -> VestaboardCharacterCode(66)
//         VestaboardCharacter.ParisBlue -> VestaboardCharacterCode(67)
//         VestaboardCharacter.Violet -> VestaboardCharacterCode(68)
//         VestaboardCharacter.White -> VestaboardCharacterCode(69)
//         VestaboardCharacter.Black -> VestaboardCharacterCode(70)
//     }
// }


// enum class VestaboardCharacter {
//     Blank,
//     A,
//     B,
//     C,
//     D,
//     E,
//     F,
//     G,
//     H,
//     I,
//     J,
//     K,
//     L,
//     M,
//     N,
//     O,
//     P,
//     Q,
//     R,
//     S,
//     T,
//     U,
//     V,
//     W,
//     X,
//     Y,
//     Z,
//     One,
//     Two,
//     Three,
//     Four,
//     Five,
//     Six,
//     Seven,
//     Eight,
//     Nine,
//     Zero,
//     ExclamationMark,
//     AtSign,
//     PoundSign,
//     DollarSign,
//     LeftParen,
//     RightParen,
//     Hyphen,
//     PlusSign,
//     Ampersand,
//     EqualsSign,
//     Semicolon,
//     Colon,
//     SingleQuote,
//     DoubleQuote,
//     PercentSign,
//     Comma,
//     Period,
//     Slash,
//     QuestionMark,
//     DegreeSign,
//     PoppyRed,
//     Orange,
//     Yellow,
//     Green,
//     ParisBlue,
//     Violet,
//     White,
//     Black
// }

// interface IValueObject<T> {
//     val value: T

//     fun get() = value
// }

// data class VestaboardCharacterSet(override val value: String) : IValueObject<String>

// data class VestaboardCharacterCode(override val value: Int) : IValueObject<Int>

// val DEFAULT_CHARACTER_SET = VestaboardCharacterSet("Flagship")


// fun getEmptyLayout(rows: Int, columms: Int) =
//     Array(rows) { Array(columms) { VestaboardCharacter.Blank.asCharacterCode().get() } }

// data class Layout(
//     val characterSet: VestaboardCharacterSet = DEFAULT_CHARACTER_SET,
//     val characters: List<List<Int>>
// )

// fun List<List<Int>>.asListOfListOfVestaboardCharacter() =
//     this.map { it.map { VestaboardCharacterCode(it).asVestaboardCharacter() } }

// fun <T> List<T>.intersperse(value: T) =
//     this.flatMap { listOf(it, value) }.let { it.subList(0, it.size) }

// fun List<Int>.max() = this.sorted().lastOrNull()

// fun countCharacters(text: String, columns: Int? = null): Int {
//     val columnLength = columns ?: 22
//     var linePosition = 0
//     var lineIndex = -1

//     // Newlines can be forced. We are also removing the brackets indicating character codes
//     val lines = text.replace("{", "").replace("}", "").split("\n")

//     return lines.fold(0) {
//             prev, line ->
//         lineIndex++

//         val words = line.split(" ")

//         // Save the previous line position as we will be resetting it
//         var prevLinePosition = 0 + linePosition;

//         // Reset the line position
//         linePosition = 0;

//         val newLineAdjustment = if (lineIndex > 0) { columnLength - prevLinePosition } else { 0 }

//         // Loop over each word in the line to add up the character count
//         prev + newLineAdjustment + words.fold(0) {
//                 prevWords, word ->
//             val space = if (linePosition > 0) 1 else 0

//             prevLinePosition = 0 + linePosition;

//             val wordLength = word.length

//             // If the word is more than 22 characters, split it up
//             if (wordLength > columnLength) {
//                 val wordChunks = word.chunked(columnLength)

//                 linePosition += wordChunks[0].length + space

//                 prevWords + wordChunks.fold(0) {
//                         prevChunks, chunk ->
//                     val wordChunkSpace = if (linePosition > 0) 1 else 0
//                     val wordChuckPrevLinePosition = 0 + linePosition

//                     linePosition += chunk.length + wordChunkSpace

//                     // If the chunk doesn't fit on the line, move it to the next line
//                     if (linePosition > columnLength) {
//                         linePosition = chunk.length
//                         (
//                                 prevChunks +
//                                         (columnLength - wordChuckPrevLinePosition) +
//                                         chunk.length
//                                 )
//                     } else {
//                         prevChunks + chunk.length + wordChunkSpace
//                     }
//                 }
//             } else {

//                 // Save the line position. If it is over 22, we will move the word to the next line
//                 linePosition += wordLength + space

//                 // If the word doesn't fit on the line, move it to the next line
//                 if (linePosition > columnLength) {
//                     linePosition = wordLength;
//                     prevWords + (columnLength - prevLinePosition) + wordLength;

//                     // If the word fits on the line, add it to the total count
//                 } else {
//                     prevWords + wordLength + space
//                 }
//             }
//         }
//     }

// }

//rewrite the above code in typescript

enum VestaboardCharacter {
    Blank,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Zero,
    ExclamationMark,
    AtSign,
    PoundSign,
    DollarSign,
    LeftParen,
    RightParen,
    Hyphen,
    PlusSign,
    Ampersand,
    EqualsSign,
    Semicolon,
    Colon,
    SingleQuote,
    DoubleQuote,
    PercentSign,
    Comma,
    Period,
    Slash,
    QuestionMark,
    DegreeSign,
    PoppyRed,
    Orange,
    Yellow,
    Green,
    ParisBlue,
    Violet,
    White,
    Black
}

//     override fun format(request: FormatRequest): FormatResponse {
//         val lines = request.text.split("\n")
//             .map { REGEX.findAll(it) }
//             .map {
//                 it
//                     .map {
//                         when {
//                             (it.value.startsWith("{") && it.value.endsWith("}")) ->
//                                 it
//                                     .groupValues
//                                     .get(1)
//                                     .toInt()
//                                     .let { VestaboardCharacterCode(it) }.asVestaboardCharacter()
//                             else -> it
//                                 .value
//                                 .first()
//                                 .asVestaboardCharacter()
//                         }
//                     }
//                     .toList()
//             }
//             .toList()
//             .map {
//                 WrappedLine(
//                     it.let {
//                         val words = mutableListOf<WrappedWord>()
//                         val word = mutableListOf<VestaboardCharacter>()
//                         for (i in 0..(it.size - 1)) {
//                             val char = it.get(i)
//                             if (char == VestaboardCharacter.Blank) {
//                                 words.add(WrappedWord(word.toList()))
//                                 word.clear()
//                             } else {
//                                 word.add(it.get(i))
//                             }
//                         }

//                         words.add(WrappedWord(word.toList()))
//                         words
//                     }
//                 )
//             }

//         val contentAreaWidth = request.cols - request.extraHPadding

//         fun makeLines(c: List<WrappedWord>): List<WrappedLine> {
//             val words =
//                 c.map { it.characters.chunked(contentAreaWidth) }.flatten().map { WrappedWord(it) }

//             if (words.requiredCharacters() <= contentAreaWidth) return listOf(WrappedLine(words))

//             for (index in 0..words.size) {
//                 val sublist = words.subList(0, index)

//                 if (sublist.requiredCharacters() > contentAreaWidth) {
//                     return listOf(
//                         WrappedLine(
//                             words.subList(
//                                 0,
//                                 index - 1
//                             )
//                         )
//                     ) + makeLines(words.subList(index - 1, words.size))
//                 }
//             }

//             return listOf()
//         }

//         val wrapping = lines.map { makeLines(it.words) }.flatten()

//         val chars = getEmptyLayout(request.rows, request.cols)

//         val formatted = wrapping.map {
//             WrappedLine(it.words.intersperse(WrappedWord(listOf(VestaboardCharacter.Blank))))
//         }

//         val numContentRows = formatted.size

//         when (numContentRows) {
//             0, 1, 2 -> {}
//             3 -> {
//                 if (request.extraHPadding == 0) {
//                     return format(request.copy(extraHPadding = request.extraHPadding + 4))
//                 }
//             }
//         }

//         val maxNumContentColumns =
//             formatted.map { it.words.map { it.characters.size }.sum() }.max() ?: 0

//         val hPad = listOf((request.cols - maxNumContentColumns) / 2, 0).max() ?: 0
//         val vPad = listOf((request.rows - numContentRows) / 2, 0).max() ?: 0

//         val emptyRow =
//             MutableList(request.cols) { VestaboardCharacter.Blank }.toList()
//                 .map { WrappedWord(listOf(it)) }
//         val emptyRowPaddings = MutableList(vPad) { WrappedLine(emptyRow) }.toList()
//         val hPaddings =
//             MutableList(hPad) { WrappedWord(listOf(VestaboardCharacter.Blank)) }.toList()

//         val padded = emptyRowPaddings + formatted.map {
//             WrappedLine(hPaddings + it.words + hPaddings)
//         } + emptyRowPaddings

//         padded.take(request.rows).forEachIndexed { row, line ->
//             line.words.map { it.characters }.flatten().take(request.cols)
//                 .forEachIndexed { column, character ->
//                     chars[row][column] = character.asCharacterCode().get()
//                 }
//         }

//         val layout = Layout(characters = chars.map { row -> row.toList() }.toList())
//         val totalCharsAvailable = request.rows * request.cols
//         val usedChars = countCharacters(request.text, request.cols)

//         return FormatSuccessResponse(layout, totalCharsAvailable, usedChars)
//     }
// }


export function classic(text: string): string {
    const lines = text.split("\n");
    const formattedLines = lines.map((line) => {
        const words = line.split(" ");
        const formattedWords = words.map((word) => {
            if (word.length > 22) {
                const chunks = word.match(/.{0,71}/g);
                return chunks.join(" ");
            } else {
                return word;
            }
        });
        return formattedWords.join(" ");
    });
    return formattedLines.join("\n");
}