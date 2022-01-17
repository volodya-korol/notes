import {
	ShoppingCartOutlined,
	FireOutlined,
	FileTextOutlined,
	SyncOutlined,
	PaperClipOutlined,
} from "@ant-design/icons";

export const iconResolver = (category: string) => (
	<div style={{ padding: 10, backgroundColor: "#BFBFC3", borderRadius: "50%" }}>
		{{
			task: <ShoppingCartOutlined />,
			idea: <FireOutlined />,
			quote: <FileTextOutlined />,
			"random thought": <SyncOutlined />,
		}[category.toLowerCase()] || <PaperClipOutlined />}
	</div>
);
