**CHEF IN YOUR PANTRY** 
*Created by: Craig Wright, Brannon Laveder and Al Oshiro.*

**Purpose**
To create an *APP* that allows users to input their own ingredients from their kitchen and utilize the recipe *API* to find recipes online.  As well as store their inputed ingredients into a database, which is called "Pantry"

**User interface**
User can input their ingredients two ways. The first way is manually. The user can click the input button and type in their words. Once they submit it will go to their *pantry*.  The other is by a UPC scanner API. Once scanned, an array of words from that UPC object will appear. The user then selects which words to keep. *for example* Mountain Bell Black Olives"  the user wouldn't want "Mountain" or "Bell" inside their pantry. So we allow them to only push the words they desire into the pantry.

**Pantry**
This is where we hold an array from user inputs. This will be called from firebase. User can also click on the item and delete it from the pantry.

**search recipe**
Once the user has the desired ingredients they hit search recipe.  A recipe will appear above the pantry.  They can see the *Title*, *prepping Time*, *number of servings*, and *recipe address*.

**API's**
API's used: spoontacular & ScandIt & UPC

**APP Opportunities**
* Login to SAVEfavorite recipes. Using Facebook  API?
* Share Favorite Recipes with CP users, including Social Media
* Create your OWN recipes and share them.
* Add more info such as cuisine, vegan, vegetarian, calories, etc. 
* Add allergic conscious searches to “filter” out recipe searches such as peanuts, milt, gluten, etc.
* Utilize data-scrapers instead of spoonacular api
* Create our own API
* Use backend languages to manage databases and our API's
* Utilize a database for storing barcodes to use that instead of a data-scraper
* Find a way to Utilize camera's/scanners without outside API usage

**Ironing Board (Future things to Fix/Improve)**
* How things are stored in the searchParamArray, spacing issues, what will work best
* Get rid of potential commas
* Have a way for user to correct abbreviated words

**Extra**
Site can also be reached through chefinyourpantry.com
