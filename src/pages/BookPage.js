import { NavLink, useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { bookLinks } from '../components/routeData';

const RouteComponent = ({ text }) => <div>{text}</div>;

const BookPage = () => {
  const { location : { pathname } } = useHistory();
  const isBookRoute = pathname.slice(1).split('/').length === 1;
  const { path } = useRouteMatch();

  return (
    <>
      {isBookRoute ? <div>Book</div> : null}
      <Switch>
        {bookLinks.map((link, index) => (
          <Route path={`${path}${link.to}`} key={index}>
            <RouteComponent text={link.text} />
          </Route>
        ))}
      </Switch>
    </>
  );
}

export default BookPage;
