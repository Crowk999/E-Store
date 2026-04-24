import Link from "next/link"


export default function Page(){
  return(
    <>

      <h1>HEllo</h1>
      <Link href="LOGIN/Login">
        <button>Click me</button>
      </Link>

      <Link href="LOGIN/Register">
        <button>Click me</button>
      </Link>
    </>
  );
}