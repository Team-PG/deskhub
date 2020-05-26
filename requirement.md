## Vision
This product is designed to make navigating the web for information important to the user easier and faster. The application allows a user to view information such as daily weather, news headlines, developer jobs in the area, and stock information for companies relevant to them from one single hub page. By allowing a user to save time and get the information they desire more efficiently, it can cut down on time spent browsing to different sites and allow the user to stay up to date on all this information easily.


## Scope (In/Out)

IN - What will your product do

  - The app will allow the user to create a username and password specific to them, which will hold information about them including their default location and companies their interested in for stock information.

  - The app will allow the user to view various widgets with specific information by toggling open windows that will display one of the categories described. These will live in a nav bar on the top of the screen.

  - The app will be able to find information for specific searches provided the user, such as specific languages when using the job search, or keywords to search for in the news. 

  - The background and quote displayed to the user will update on each visit, keeping the aesthetic of the page fresh.


OUT - What will your product not do.

  - Our product will not allow a user to modify which widgets are available to them. 

## Minimum Viable Product
What will your MVP functionality be?

  - Homepage designed for mobile use, with a central section displaying time of day and date, username, and a to-do list that can be updated/changed.

  - Ability to log in with username and password, which will be checked upon subsequent log ins or saved to local storage depending on user preference.

  - Will contain the following widgets/APIs: Weather, Github DevJobs, New York Times News, Stocks(??), random daily quote (not a widget, always displayed below center section), background image API.


## Stretch
What stretch goals are you going to aim for?

  - Multiple breakpoints i.e. tablet and desktop views

  - Select a theme for the website (Will change background image type and/or color scheme)

  - More widgets for the user to view.

  - OAuth for single-application Reddit API.

  - 



## Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:

  1. A user can click on icons in the nav bar to toggle open the different widgets available and view their information.

  2. A user can make specific searches on these pages to find more information outside of the defaults they receive.

  3. A developer can easily implement new widgets and features due to the straightforward design of the application.


## Data Flow

  1. On start up, if the user has a username in his local storage they will be taken straight to the home page, if not they will be presented with a login screen where they can sign in or create an account and then be directed to the home page. 

  2. On the home page, the user will be presented with a central section which says their name, the time and date, and then provides them with a to-do list they may enter information into, as well as hamburger menu which will display an assortment of widget toggling icons.

  3. When an icon is clicked, the window for it will open up, displaying that widgets information to the user, which they can view and interact with, and then either switch to another widget by clicking a different icon, or click the icon they're on to close the window. 

  4. The only non-widget icon will redirect the user to the about us page, where they can view information both about the app as a whole as well as individual bios for each of us, which can be toggled open in a similar manner to the widgets.


## Non-Functional Requirements
  1. Security
    - The user will be able to set a username and password, and if they don't choose to have this information saved to local storage then they will be need to enter this information in each time. This will prevent other users of the site from accessing their information. Though it is a rudimentary measure it will at least allow the app to store some information about each user without making that information completely public.
  2. Reliability
    - The user can depend on the site to display the same information in the same formats whenever they visit they site. They will not only know what information they can find on the site, but the layout should be intuitive enough to navigate reliably as well. This will be implemented by making sure the APIs always work as expected when we are testing them, and that the page is laid out in an understandable with, where the data flow is obvious and logical.