import { PluginItem } from "@babel/core";

export default function(): PluginItem {
	return {
		visitor: {
			Program(path, state) {
				const forbidden = state.opts.props || []

				path.traverse({
					JSXIdentifier(current) {
						const nodeName = current.node.name
						
						if (forbidden.includes(nodeName)) {
							current.parentPath.remove()
							// удалили этот атрибут (ноду) от html тега
						}
					} // для каждого html тега есть свой атрибут. этот атрибут хранится в node
				}) // проходим по всем нодам АСТ дерева
			} // используем эту ноду для того, что прокинуть какие-то пропсы для работы
		},
	};
}