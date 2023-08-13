import "./Journal.css"; //This is the css file linked to the journal page, any style you define here would affect the html in the return statement

function Journal() {
    return (
        //take this space as your normal html, you can start coding from here
        //all your image imports from figma should be made under Tranquil App/Assets
        //They should be svg format so as to optimize speed
        //You can check the other files and compare if you're looking for something but do not edit them
        <div className="journalContainer">
            <header>
                <h1>Journal</h1>
            </header>

            <div className="aboutJournal">
                <p>Journal is a well recommended act of putting down </p>
                <p>your thoughts and feelings. Allowing you fully access</p>
                <p>the many joys in yourself</p>
            </div>

            <button id="begin">Begin</button>

            <div className="blankPage">
                <h2>Blank Page</h2>
                <p>start journaling with a </p>
                <p>blank Page</p>
                <button> Empty Page</button>
            </div>

            <div className="tips">
                <h2> Tips on what to write about</h2>
                <div className="ideas">Productivity</div>
                <div className="ideas">stress & Anxiety</div>
                <div className="ideas">Therapy</div>
                <div className="ideas">Happiness</div>
                <div className="ideas">Self - Discovery</div>
                <div className="ideas">Relationship</div>
            </div>
        </div>
    );
}

export default Journal;

//run npm start in your terminal after navigating to the directory of this project in your local machine just like we did the other day;
//it'll display the normal flow of the app but you'll have to edit the url in the search bar to localhost:3000/Team-Orange/#/journal
//that's where i put this page's route
//if you want to view it on your phone as you're editing , make sure your computer is connected to your phone's network while you run npm start, it gives a second url that's not localhost
//navigate to that too and change the url too. If this isn't clear, feel free to contact me

//you might want to log into the app maybe just to see what it looks like firsthand, use the manual signup option , google doesn't work for now and even if it did, on localhost, it wouldn't
//if you're done with a page and want to start another, commit your changes, i'll edit it for a new route and you can continue
