// eslint-disable-next-line react/no-deprecated
import { createRoot } from "react-dom/client"
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider/index";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary/index"
import { StoreProvider } from "@/app/providers/StoreProvider";
import "./shared/config/i18nConfig/i18n"
import "@/app/styles/index.scss"

const container = document.getElementById('root')

if (!container) {
	throw new Error('Root container has not defined. Try refresh page...')
}

const root = createRoot(container)
root.render(<BrowserRouter>
	<StoreProvider>
		<ErrorBoundary>
			<ThemeProvider>
				<App/>
			</ThemeProvider>
		</ErrorBoundary>
	</StoreProvider>
</BrowserRouter>
)
