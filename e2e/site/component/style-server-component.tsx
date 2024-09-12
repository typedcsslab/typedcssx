import cssx from 'typedcssx';

const css = cssx.create({
  test_server: {
    color: 'green',
  },
});

export const ServerComponent = () => {
  return (
    <p className={css.test_server} data-testid="e2e-test-p">
      ServerComponent
    </p>
  );
};
