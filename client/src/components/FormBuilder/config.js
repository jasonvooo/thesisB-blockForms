export default {
  projectName: process.env.PROJECT_NAME || "FormBuilder",
  server: {
    remote: process.env.SERVER_URL,
    bucket: "formbuilder",
  },
  appURL: process.env.APP_URL || window.location.origin + window.location.pathname,
  fieldList: [
    {
      id: "text",
      icon: "fa fa-minus",
      label: "Text",
      jsonSchema: {
        type: "string",
        title: "Edit",
        description: "",
        default: ""
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Instructions"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "multilinetext",
      icon: "fa fa-bars",
      label: "Multi-line text",
      jsonSchema: {
        type: "string",
        title: "Edit",
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "textarea",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Instructions"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "checkbox",
      icon: "fa fa-check",
      label: "Checkbox",
      jsonSchema: {
        type: "boolean",
        title: "Edit",
        default: false,
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "select",
      icon: "fa fa-list",
      label: "Single choice (select)",
      jsonSchema: {
        type: "string",
        format: "string",
        title: "Edit",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "select",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
      },
      formData: {}
    },
    {
      id: "radiobuttonlist",
      icon: "fa fa-list",
      label: "Single choice (radio)",
      jsonSchema: {
        type: "string",
        title: "Edit",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
      },
      formData: {}
    },    
    {
      id: "multiple-checkbox",
      icon: "fa fa-tasks",
      label: "Multiple choice (checkboxes)",
      jsonSchema: {
        type: "array",
        title: "A multiple choices list",
        items: {
          type: "string",
          enum: ["risposta 1", "risposta 2", "risposta 3"],
        },
        uniqueItems: true,
      },
      uiSchema: {
        "ui:widget": "checkboxes",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            items: {
              type: "object",
              title: "Choices",
              properties: {
                enum: {
                  title: null,
                  type: "array",
                  items: {
                    type: "string"
                  },
                  default: ["risposta 1", "risposta 2", "risposta 3"],
                }
              }
            }
          }
        },
      },
      formData: {}
    },
    {
      id: "date",
      icon: "fa fa-calendar",
      label: "Date",
      jsonSchema: {
        type: "string",
        format: "date",
        title: "Edit",
      },
      uiSchema: {
        "ui:widget": "alt-date",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"}
          }
        },
      },
      formData: {}
    },
  ],
};
