const Home = (props: { name: string }) => (
    <div>
        {props.name ? `Hi ${props.name}!` : "You are not logged in"}
    </div>
);

export default Home;