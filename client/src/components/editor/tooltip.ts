import { RemoteUser } from "@/types/user"
import { StateField } from "@codemirror/state"
import { EditorView, showTooltip } from "@codemirror/view"

export function tooltipField(users: RemoteUser[]) {
    return StateField.define({
        create: () => getCursorTooltips(users),
        update(tooltips, tr) {
            if (!tr.docChanged && !tr.selection) return tooltips
            return getCursorTooltips(users)
        },
        provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
    })
}

export function getCursorTooltips(users: RemoteUser[]) {
    return users
        .filter(user => user.typing && user.cursorPosition !== undefined)
        .map((user) => {
            const text = user.username || 'Anonymous'
            const pos = user.cursorPosition

            // Generate a consistent color based on username
            const stringToColor = (str: string) => {
                let hash = 0
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash)
                }
                
                let color = '#'
                for (let i = 0; i < 3; i++) {
                    const value = (hash >> (i * 8)) & 0xFF
                    color += ('00' + value.toString(16)).substr(-2)
                }
                
                return color
            }
            
            const userColor = stringToColor(text)

            return {
                pos,
                above: true,
                strictSide: true,
                arrow: true,
                create: () => {
                    const dom = document.createElement("div")
                    dom.className = "cm-tooltip-cursor"
                    dom.style.backgroundColor = userColor
                    
                    // Add caret animation to show user is typing
                    const usernameSpan = document.createElement("span")
                    usernameSpan.textContent = text
                    
                    const caret = document.createElement("span")
                    caret.className = "typing-caret"
                    caret.textContent = "▎"
                    
                    dom.appendChild(usernameSpan)
                    dom.appendChild(caret)
                    
                    return { dom }
                },
            }
        })
}

export const cursorTooltipBaseTheme = EditorView.baseTheme({
    ".cm-tooltip.cm-tooltip-cursor": {
        color: "white",
        border: "none",
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "500",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        zIndex: "10",
        transition: "transform 0.2s ease",
        "& .cm-tooltip-arrow:before": {
            borderTopColor: "inherit", // Inherit the background color
        },
        "& .cm-tooltip-arrow:after": {
            borderTopColor: "transparent",
        },
        "& .typing-caret": {
            display: "inline-block",
            marginLeft: "3px",
            animation: "blink 1s infinite",
            opacity: "0.8",
        },
    },
    "@keyframes blink": {
        "0%, 100%": { opacity: "0" },
        "50%": { opacity: "1" }
    }
})