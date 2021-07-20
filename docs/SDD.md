# Stock Trading Simulator Project
## Software Design Document
###1.	Model
####1.1.	Game
 +  1.1.1.	Game
	 - Container holding a name, cash amount and positions.
 + 1.1.2.	Name
	 - String the player can put in for a name for their save game.
 + 1.1.3.	Cash Amount
	 - Amount in fake cash
 + 1.1.4.	Positions
	 - Array of position
####1.2.	Position
 + 1.2.1.	Symbol
	 - String of purely lowercase letters. Displayed as upper case. A GetDisplay method exists.
 + 1.2.2.	Buy Price per Share
	 - Number. Cannot be negative
 + 1.2.3.	Date
	 - The date and time it was “purchased”
###User Interface
####2.1.	Template
 +  2.1.1.	Header
	 - Displays at the top
 + 2.1.2.	Footer
	 - Displays at the bottom
 + 2.1.3.	Navigation Bar
	 - The navigation bar is a part of the header. It will provide buttons to the positions, search, and game screens.
 + 2.1.4.	Content Container
	 - Displays flexibly between the header and footer
	 - Holds a screen.
	 - Allows a screen to be replaced with another screen. Screen is passed in as an element.
####2.2.	Screens
 + 2.2.1.	Positions
	 - Displays the positions currently held in the game. Each displayed with a position view.
	 - Allows a position to be sold.
	 - Allows one to buy more.
	 - Shows total value.
 + 2.2.2.	Search
	 - Displays a search bar
	 - Shows search result below
 + 2.2.3.	Game
	 - Displays information about the game, like the name
	 - Has a settings container with some basic settings. – Low priority as it requires saving.
	 - New Game Button – Starts a new game
	 - Shows a Load Game Container
####2.3.	Views
 + 2.3.1.	Search Result
	 - Displays the symbol and current price
	 - Displays a chart, adjustable by time. Separate GET request.
	 - Displays basic information in asset
	 - Displays Balance Sheet
	 - Displays Income Statement
	 - Displays Cashflow Statement
 + 2.3.2.	Position
	 - Displays how much is owned.
	 - Displays symbol.
	 - Displays current price.
	 - Displays price bought at
	 - Displays number of shares
	 - Displays buy button. Brings up transact for buy.
	 - Displays sell button. Brings up transact for sell.
 + 2.3.3.	Transact
	 - Displays number of shares input
	 - Displays transact button (which displays buy or sell, and saves the game)
	 - Displays cancel button, which dismisses the view.
 + 2.3.4.	Settings
 + 2.3.5.	Load Game Container
	 - Displays a list of load games from the local storage
 + 2.3.6.	Load Game View
	 - Displays a single load game
	 - Displays its name
	 - Displays last log in.
####2.4.	Elements
 + 2.4.1.	Button
 + 2.4.2.	Text Input
 + 2.4.3.	Element Builder
 + 2.4.4.	Are You Sure – Low Priority
###Theme
####3.1.	Overall
 +  3.1.1.	Clean, focused, calm, strong theme
####3.2.	Colors
 +  3.2.1.	Foundation
	 - Weak, Darker Blue
 + 3.2.2.	General
	 - Blues
 + 3.2.3.	Strong
	 - Yellow
 + 3.2.4.	Text
	 - White
####3.3.	Shape
 + 3.3.1.	Clean
 + 3.3.2.	Slight bevel
 + 3.3.3.	Very small rounded corners
 + 3.3.4.	Convey stability with squares.
####3.4.	Texture
 + 3.4.1.	No texturing. Clean solid colors.
