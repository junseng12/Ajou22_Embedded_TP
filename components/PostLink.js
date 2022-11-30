import Link from "next/link";

export default function PostLink(props) {
  (props) => (
    <li>
      <Link href={`/post?id=${props.id}`}>
        <a style={{ fontSize: "1.5rem" }}>{props.title}</a>
      </Link>
    </li>
  );
}
