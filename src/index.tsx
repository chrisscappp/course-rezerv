// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider/index";
import { SideBarProvider } from "app/providers/SidebarProvider/index"
import { ErrorBoundary } from "app/providers/ErrorBoundary/index"
import "./shared/config/i18nConfig/i18n"

render(
	<BrowserRouter>
		<ErrorBoundary>
			<ThemeProvider>
				<SideBarProvider><App/></SideBarProvider>
			</ThemeProvider>
		</ErrorBoundary>
	</BrowserRouter>,
	
	document.getElementById('root')
)