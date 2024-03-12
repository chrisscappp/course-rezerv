// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider/index";
import { ErrorBoundary } from "app/providers/ErrorBoundary/index"
import { StoreProvider } from "app/providers/StoreProvider";
import "./shared/config/i18nConfig/i18n"
import "app/styles/index.scss"

render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<App/>
				</ThemeProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>,
	
	document.getElementById('root')
)