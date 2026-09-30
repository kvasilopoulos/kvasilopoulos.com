import { render } from "@testing-library/react"
import { parseBoldText } from "./parseBoldText"

test("renders **text** as <strong> and leaves the rest as plain text", () => {
    const { container } = render(<p>{parseBoldText("Scale **LLMOps** for **1M+** requests")}</p>)
    expect(container.textContent).toBe("Scale LLMOps for 1M+ requests")
    expect([...container.querySelectorAll("strong")].map((s) => s.textContent)).toEqual(["LLMOps", "1M+"])
})
