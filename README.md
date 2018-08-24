# Initiative

This project was made for the web development course taken at [Karel de Grote university college](www.kdg.be). 

It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Specification

The specification received is included below.

## Overview

Create an initiative tracker for tabletop roleplaying games, to be used for combat. A good example is [improved-initiative.com](http://www.improved-initiative.com).

A battle scene is called an encounter, divided into several rounds of 6 seconds each - one minute of in-game combat has 10 rounds.

An encounter has both players and monsters, who each get a turn each round. Combat ends when all monsters (or players) are defeated.

To determine acting order during an encounter, initiative is rolled by adding a combat participant's modifier to the result of a 20-sided die.

## Functional requirements

###Encouters

* It should be possible to create several encounters beforehand.
* Players and monsters can be saved to an encounter, so no time is wasted during actual play.
* Loading an encounter should take you to the encounter view.

###Characters

* Characters can be created and saved in the app
* A list of characters can be displayed
* Characters have at least the following properties:

  * Name: the name of the fictional character
  * Player: the name of the character's player
  * Hit Points (HP): the maximum number of life points the character can have
  * Armor Class (AC): how difficult it is to hit the character
  * Initiative modifier (init): This is the modifier used when rolling initiative
   
###Creatures

* Creatures can be loaded from a list in the app and added to an encounter
* A user should also be able to create their own creatures
* Creatures have the same properties as a character, but don't have a player.

### Encounter view

Every encounter should have its own URL, e.g. localhost:4000/<encounter name>, so it can be bookmarked

The encounter view is shown when an encounter is started:
   
1. Initiative is determined for all participants (initiative modifier + 20-sided die result)  
2. Initiative can be manually adjusted if players would rather roll a die themselves
3. When initiative is confirmed, all participants should be sorted by descending initiative totals. If they tie, the participant with the higher initiative modifier should come first.

**Characters and creatures** should be displayed in rectangular frames, containing:
* Name: in large font
* Player (if applicable): in small font, in a top corner
* Hit points: represented by giving the entire frame a color, either as a gradient or a progress bar. When hit points are below 50%, the frame should get a bloody effect.
* The acting participant is clearly designated, in a different way from selection.

**Possible actions**:

* Next turn: selects the next participant
* Previous turn: selects the previous participant
* End encounter: return to starting screen

When **selecting a participant** by clicking on its frame, extra UI elements should appear:
* Damage/heal: adjust current HP with an entered value:
   * When you damage someone with 100 by 20 HP, their HP left are 80. HP can't be lower than 0
   * When healing someone who is at 60/80 HP for 25, their HP should be 80. HP can't exceed their maximum.
* Remove from encounter: the user should be asked for confirmation first (OK/cancel). Once confirmed, the participant is removed.
* Turn invisible:
   * a toggle button to make the participant invisible
   * Invisible participants are greyed out
   * Invisible participants are skipped when it would otherwise have been their turn

When **selecting a different participant**, those extra UI elements should disappear.

All parameters should be instantly visible. Changes should be processed through POST requests.
   
## Optional features

Select at least 2 of the following extra features:

* **(chosen)** Encounters in the encounter view can be saved, including all current properties on participants. When loading this encounter again, previous state should be reloaded.
* A search filter can be applied in the creature list, where only creatures whose name matches the typed letters are shown.
* **(chosen)** When creating heroes and creatures, the user can add a picture. When loading a participant, their picture is also fetched through the backend.
* Show a detail screen, where participant details not shown in other views are also visible. Include a JSON representation of the participant.
* The interface is responsive with breakpoints for smartphones.
* Saved encounters persist on the backend, so they can be loaded upon a new application start.
* Add a MongoDB database via Node.js (can be limited to fetching data) 
