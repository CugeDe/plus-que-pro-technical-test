import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={{ offset: 3, span: 6 }}>
          <h1 className="text-center mb-5">Welcome to the app for trending Movies</h1>

          <p>
            This application was realized as a technical test for a job
            application. It uses the <a href="https://www.themoviedb.org/">The Movie Database API</a> to
            fetch the trending movies and display them in a list.
          </p>
          <p>
            It is built using Next.js, React and typescript. It also uses
            bootstrap for styling and react-bootstrap for components.
          </p>
          <p>
            The application fetches the trending movies from a REST API developed
            using API Platform on top of Laravel. Laravel is responsible for
            fetching the data from The Movie Database API and caching it for a
            period of time.
          </p>

          <p>
            The data stored in the database is automatically updated every
            24 hours. However, it can be manually refreshed by clicking the
            refresh button on the top right corner of the administration panel.
            Or, by running the command <code>php artisan app:warmup</code> in
            the terminal where the API is running.
          </p>

          <p>
            If you want to see more movies inside the application, you can
            update the <code>PAGE_LIMIT</code> constant in the file{' '}
            <code>api/app/Console/Commands/SyncMoviesCommand.php</code>.
            If you want to change this constant to <code>-1</code>, all the
            movies will be fetched from the API. Be aware that this can take
            some time and can be a heavy operation.
          </p>

          <h5>Page structure</h5>
          {/* Tree of the pages */}
          <ul>
            <li>
              <strong><Link href="/">Home</Link></strong>
              <ul>
                <li>
                  <strong><Link href="/login">Login</Link></strong>
                </li>
                <li>
                  <strong><Link href="/register">Register</Link></strong>
                </li>
                <li>
                  <strong><Link href="/movies">Movie list</Link></strong>
                  <ul>
                    <li>
                      <strong>Movie details (only available with a movie ID)</strong>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong><Link href="/administration">Administration</Link> (requires authentication)</strong>
                </li>
              </ul>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
