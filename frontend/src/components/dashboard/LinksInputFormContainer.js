import { Form, Input, Button, Checkbox } from "antd";
const { TextArea } = Input;


const LinksInputFormContainer = ({ handleAddNewLink }) => {
	const onFinish = (values) => {
		console.log("Success:", values);
		handleAddNewLink(values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			name="basic"
			// labelCol={{
			// 	span: 4,
			// }}
			// wrapperCol={{
			// 	span: 8,
			// }}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			layout="vertical"
		>
			<Form.Item
				label="Title"
				name="title"
				rules={[
					{
						required: true,
						message: "Please input your title!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item 
				label="Content"
				name="content"
			>
				<TextArea rows={12} />
			</Form.Item>

			<Form.Item
				label="URL"
				name="url"
				rules={[
					{
						required: true,
						message: "Please input your URL!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					span: 8,
				}}
			>
				<Button type="primary" htmlType="submit">
					Add Blog
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LinksInputFormContainer;
