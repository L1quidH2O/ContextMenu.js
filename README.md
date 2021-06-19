ContexMenu.js
=============
Multi-level ContextMenu Created in Vanilla Javascript (No CSS Files)

#### Import with jsDelivr
`
    <script src="https://cdn.jsdelivr.net/gh/L1quidH2O/ContextMenu.js/contextmenu.js"></script>
`

### How to use
    createContextMenu(Element, Structure, Click)
- Element : a selector like "#div", its where the ContextMenu can be activated (Element is "body" in demo)
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
- "divider": Divider is not part of an Item, its an <hr> element

### Custom CSS
Create Custom CSS by changing the following classes:
|           Class         |  Element Type  |
| :---------------------- | :------------: |
| .contextmenu-container  | \<div\>          |
| .contextmenu-divider    | \<hr\>           |
| .contextmenu-text       | \<span\>         |
| .contextmenu-extraText  | \<span\>         |

# NOTE
Sub-ContextMenus will not work on ContextMenus with heights larger than the windows height
