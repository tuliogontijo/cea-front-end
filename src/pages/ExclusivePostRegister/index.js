import { useState, useEffect } from "react";
import { Form, PageHeader, Radio } from "antd";
import { useLocation, useParams } from "react-router-dom";

import FormSurvey from "./components/FormSurvey";
import FormContent from "./components/FormContent";
import RouterBreadcrumb from "../../components/RouterBreadcrumb";

import { formatRoutes } from "./utils/formatRoutes";

import styles from "./styles.module.css";

const { Item }  = Form;

const ExclusivePostRegister = ({ isEdit }) => {
  const { id } = useParams();
  const { state } = useLocation();

  const [type, setType] = useState("TEXT");

  useEffect(() => {
    if (isEdit) {
      const {record: exclusivePost} = state;

      const typePost = exclusivePost?.type;
      setType(typePost);
    }
  }, [isEdit, state]);

  const isContent = type === "TEXT";
  const isSurvey = type === "SURVEY";

  const titleScreen = !isEdit
    ? "Cadastro de Conteúdo Exclusivo"
    : "Edição de Conteúdo Exclusivo";
  const routes = formatRoutes(isEdit);

  const handleType = ({target}) => {
    setType(target.value);
  };

  return (
    <div>
      <PageHeader
        title={titleScreen}
        breadcrumbRender={() => <RouterBreadcrumb routes={routes}/>}
      />

      <div className={styles.containerForm}>
        <Form
          name="type-exclusive-post-form"
        >
          <Item
            name="type"
            label="Tipo"
          >
            <Radio
              value="TEXT"
              checked={isContent}
              onClick={handleType}
              disabled={isEdit && !isContent}
            >
              Conteúdo
            </Radio>

            <Radio
              value="SURVEY"
              checked={isSurvey}
              onClick={handleType}
              disabled={isEdit && !isSurvey}
            >
              Enquete
            </Radio>
          </Item>
        </Form>

        {isContent && (
          <FormContent
            id={id}
            isEdit={isEdit}
            stateEdit={state}
          />
        )}

        {isSurvey && (
          <FormSurvey
            id={id}
            isEdit={isEdit}
            stateEdit={state}
          />
        )}
      </div>
    </div>
  );
}

export default ExclusivePostRegister;
