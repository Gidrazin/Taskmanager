import { dateFormat } from "../../utils/dateUtils";
import { patchTask, postTask } from "../../api";
import { Task, Theme, Performer } from "../../types";
import dayjs from "dayjs";

import "./Form.scss";
import {
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
  ConfigProvider,
} from "antd";

interface Props {
  setAppForm: Function;
  themes: Theme[];
  performers: Performer[];
  openNotification: Function;
  formState: Omit<Task, "status">;
}

export default function TaskForm({
  setAppForm,
  themes,
  performers,
  openNotification,
  formState,
}: Props) {
  const onSubmitHandler = async (values: any) => {
    const sendItems: any = {};

    sendItems.theme = values.theme;
    sendItems.title = values.title;
    sendItems.performer = values.performer;
    sendItems.report = values.report ? values.report : "";
    sendItems.end = dateFormat(values.end.$d).isoDate;
    sendItems.pages = values.pages ? values.pages : 0;

    try {
      if (formState.id) {
        await patchTask(formState.id, JSON.stringify(sendItems));
        openNotification("success", "Задача обновлена");
      } else {
        await postTask(JSON.stringify(sendItems));
        openNotification("success", "Задача добавлена");
      }
      setAppForm(<></>);
    } catch (error) {
      openNotification("error", "Произошла ошибка");
      console.log(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
          },
          DatePicker: {
            presetsMaxWidth: 300,
          },
          Select: {
            selectorBg: "transparent",
            optionSelectedBg: "#6F6D72",
            optionSelectedColor: "#E9E8EE",
            optionActiveBg: "rgba(111, 109, 114, 0.3)",
          },
        },
        token: {
          fontFamily: "Jura Bold",
          borderRadius: 0,
          colorPrimary: "#000120",
          colorLink: "#000120",
          colorLinkHover: "rgba(0, 1, 32, 0.5)",
          colorBorder: "#000120",
        },
      }}
    >
      <div className="form form--overlay">
        <div className="form__wrapper">
          <Form onFinish={(values) => onSubmitHandler(values)}>
            <div className="form__header">
              <h2 className="form__title">Добавление задачи</h2>
              <svg
                onClick={() => {
                  setAppForm(<></>);
                }}
                className="form__close"
                viewBox="64 64 896 896"
                focusable="false"
                width="1.1em"
                height="1.1em"
                fill="#000120"
                aria-hidden="true"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </div>
            <div className="form__main">
              <div className="form__item">
                <label className="form__item-label" htmlFor="theme">
                  Тема:
                </label>
                <Form.Item
                  name="theme"
                  rules={[{ required: true, message: "Выберете тему!" }]}
                  initialValue={formState.theme.slug}
                >
                  <Select>
                    <Select.Option value="">--</Select.Option>
                    {themes.map((themeItem, index) => (
                      <Select.Option key={index} value={themeItem.slug}>
                        {themeItem.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="form__item">
                <label className="form__item-label" htmlFor="title">
                  Наименование
                </label>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Введите наименование!" }]}
                  initialValue={formState.title}
                >
                  <Input className="form__item-element" />
                </Form.Item>
              </div>

              <div className="form__item">
                <label className="form__item-label" htmlFor="performer">
                  Исполнитель
                </label>
                <Form.Item
                  name="performer"
                  initialValue={formState.performer?.username}
                >
                  <Select>
                    <Select.Option value="">--</Select.Option>
                    {performers.map((performerItem, index) => (
                      <Select.Option key={index} value={performerItem.username}>
                        {performerItem.first_name +
                          " " +
                          performerItem.last_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="form__item">
                <label className="form__item-label" htmlFor="end">
                  Окончание
                </label>
                <Form.Item
                  rules={[{ required: true, message: "Укажите дату!" }]}
                  name="end"
                  initialValue={formState.end && dayjs(formState.end)}
                >
                  <DatePicker
                    placeholder="ДД.ММ.ГГГГ"
                    className="form__item-element"
                    style={{ display: "block" }}
                  />
                </Form.Item>
              </div>

              <div className="form__item">
                <label className="form__item-label" htmlFor="report">
                  Листок запуска
                </label>
                <Form.Item name="report" initialValue={formState.report}>
                  <Input className="form__item-element" />
                </Form.Item>
              </div>

              <div className="form__item">
                <label className="form__item-label" htmlFor="pages">
                  Количество листов
                </label>
                <Form.Item name="pages" initialValue={formState.pages}>
                  <InputNumber
                    className="form__item-element"
                    min={0}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form__footer">
              <button className="form__btn" type="submit">
                <svg
                  className="form__btn-hexSvg"
                  viewBox="0 0 287 91"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs />
                  <path
                    id="Rectangle 3"
                    d="M35.87 0L251.12 0L287 45L251.12 90L215.25 90L143.5 90L71.75 90L35.87 90L0 45L35.87 0Z"
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </svg>
                <span className="form__btn-text">Сохранить</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
}
