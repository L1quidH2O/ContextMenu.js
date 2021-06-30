ContexMenu.js
=============
Multi-level ContextMenu Created in Vanilla Javascript (No CSS Files)

#### Import with jsDelivr
`
    <script src="https://cdn.jsdelivr.net/gh/L1quidH2O/ContextMenu.js@latest/contextmenu.js"></script>
`

### How to use
    createContextMenu(Element, Structure, Click)
- Element : could be a selector like `"#div"`, or a DOM Element like `document.body`
- Structure : an Array that contains information about the structure of the ContextMenu (Will be explained below)
- Click : leave it undefined for the ContextMenu to be activated by a right-click, define it so it would be activated by a left-click

### Structure
Example: 

    [
        {
            'text': 'Item',
            'extraText': '#1',
            'onclick': function(e){console.log(e)}
        },
        {
            'text': 'Item',
            'extraText': '#2'
        },
        'divider',
        {
            'text': 'Sub',
            'extraText': '#3',
            'sub': [
                {
                    'text': 'Item',
                    'extraText': '#4'
                }
            ]
        }
    ]

Each object in the the Array is an Item in the ContextMenu
- "text" : [String] main text to display on left side of Item
- "extraText": [String] text to display on right side of Item (Used for shortcuts such as "ctrl+s")
- "onclick": [Function] function to run when Item is clicked, first argument is click event
- "sub": [Array] create a Sub-ContextMenu (Multi-Level ContextMenu), syntax is the same as Structure, hovering over Item will open Sub-ContextMenu
- "divider": Divider is not part of an Item, its a \<hr\> element

### Custom CSS
Create Custom CSS by changing the following classes:
|           Class         |  Element Type  |                    Note                    |
| :---------------------- | :------------: | :----------------------------------------- |
| .contextmenu-container  | \<div\>        | ----
| .contextmenu-item       | \<div\>        | ----
| .contextmenu-divider    | \<hr\>         | ----
| .contextmenu-text       | \<span\>       | ----
| .contextmenu-extraText  | \<span\>       | Used mainly to display keyboard shortcut
| .contextmenu-focus      | \<div\>        | A class name that is applied to .contextmenu-item if it has a sub-contextmenu that is opened

### HTML Diagram:

    <div class="contextmenu-container">
        <div style="position: relative;">
            <div class="contextmenu-item">
                <span class="contextmenu-text">text</span>
            </div>
        </div>
        <div class="contextmenu-focus" style="position: relative;">
            <div class="contextmenu-item">
                 <span class="contextmenu-text">(sub) -></span>
            </div>
            <div class="contextmenu-container">
                <div class="contextmenu-item">
                    <span class="contextmenu-text">text</span>
                </div>
            </div>
        </div>
    </div>


The above Diagram would have this code:

    CreateContextmenu(Element, [
        {
            "text": "text"
        },
        {
            "text": "(Sub)",
            "sub":[
                {
                    "text": "text"
                },
            ]
        }
    ], Click)


Also, note that the opened sub-contextmenu has the class ".contextmenu-focus"

# NOTE
Sub-ContextMenus will not work on ContextMenus with heights larger than the windows height
