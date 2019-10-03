import * as React from 'react';

type IOwnProps = {
  status?: string | null;
  error?: boolean;
};

type RawFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

class Form extends React.Component<IOwnProps & RawFormProps, {}> {
  constructor(props: IOwnProps) {
    super(props);
  }

  static Header: React.FC = ({ children }) => (
    <div className="form__header">{children}</div>
  );

  static Content: React.FC = ({ children }) => (
    <div className="form__content">{children}</div>
  );

  static Footer: React.FC = ({ children }) => (
    <div className="form__footer">{children}</div>
  );

  render() {
    const { status, error, children, ...props } = this.props;
    return (
      <form className="form" method="POST" autoComplete="off" {...props}>
        <div className="form__wrapper">{children}</div>
        <div
          className={error ? 'form__status form__status_error' : 'form__status'}
        >
          {status}
        </div>
      </form>
    );
  }
}

export default Form;
