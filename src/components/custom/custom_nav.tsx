import Image from "next/image";
import Link from "next/link";

const CustomNav_v1 = (title?: string | null) => {
  return (
    <nav className="bg-white shadow-md p-1 rounded-lg">
      <div className="ml-4 mx-auto flex align-middle">
        <Link href="/" className="border rounded-lg mr-2">
          <Image
            src="/ssui.png"
            alt="thesift Ui log with a sparrow sitting on blocks"
            width={24}
            height={24}
            className="rounded-lg"
          />
        </Link>
        <p className="text-[#CE4F3D] text-md font-bold">
          {title ? title : "Documentation Tool T-1"}
          <span className="ml-2 text-xs font-[500] hidden">type-1</span>
        </p>
      </div>
    </nav>
  );
};

export { CustomNav_v1 };
