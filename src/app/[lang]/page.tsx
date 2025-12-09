import StarUpgradeCalculator from "@/components/StarUpgradeCalculator";
import WeaponUpgradeCalculator from "@/components/WeaponUpgradeCalculator";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getDict } from "../../dictionaries/dictionaries";

interface Props {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const dict = getDict(lang);

  return {
    title: dict.page_title,
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const dict = getDict(lang);

  return (
    <div className="content">
      <div className="card-background m-8 overflow-hidden rounded shadow-lg">
        <div className="m-4">
          <h1 className="text-2x1 mb-4 font-bold">{dict.page_title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="card-background mx-8 my-1 overflow-hidden rounded shadow-lg">
          <StarUpgradeCalculator dict={dict} />
        </div>
        <div className="card-background mx-8 my-1 overflow-hidden rounded shadow-lg">
          <WeaponUpgradeCalculator dict={dict} />
        </div>
      </div>
      <div className="card-background m-8 overflow-hidden rounded shadow-lg">
        <div className="m-4 flex justify-between">
          <div className="">
            <Link href="https://github.com/weiliang79/princess-connect-simple-calculator">
              <FontAwesomeIcon icon={faGithub} />{" "}
              weiliang79/princess-connect-simple-calculator
            </Link>
          </div>
          <div className="">
            <Link href="/en">EN</Link> / <Link href="/tw">TW</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
