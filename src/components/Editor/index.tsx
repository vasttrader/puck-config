import { type ComponentConfig, FieldLabel } from "@measured/puck";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";

export type EditorProps = {
  text?: string;
};

export const Editor = {
  fields: {
    text: {
      type: "custom",
      render: ({ value, onChange }) => {
        return (
          <FieldLabel label="Editor">
            <TinyMCE
              licenseKey="gpl"
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/8.1.2/tinymce.min.js"
              init={{
                height: 200,
                menubar: false,
                statusbar: false,
                branding: false,
                plugins: "link lists table",
                toolbar: "bold italic | bullist numlist | link | table",
              }}
              initialValue={value}
              onBlur={(_, editor) => {
                onChange(editor.getContent());
              }}
            />
          </FieldLabel>
        );
      },
    },
  },
  defaultProps: {
    text: "",
  },
  render: ({ text }) => <div dangerouslySetInnerHTML={{ __html: text ?? "" }} />,
} satisfies ComponentConfig<EditorProps>;
