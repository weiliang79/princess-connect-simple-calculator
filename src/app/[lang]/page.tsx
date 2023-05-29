import StarUpgradeCalculator from "@/components/StarUpgradeCalculator";
import WeaponUpgradeCalculator from "@/components/WeaponUpgradeCalculator";
import { fetchStarUpgradeData, fetchWeaponUpgradeData } from "@/utilities/fetchData";
import { getDictionary } from "../../dictionaries/dictionaries";
import Link from "next/link";

interface Params {
      lang: string;
}

export async function generateMetadata({params} : { params: Params }) {

      const dict = await getDictionary(params.lang);

      return {
            title: dict.page_title,
      };
}

export default async function Page({params} : { params: Params }) {

      const dict = await getDictionary(params.lang);
      const starData = fetchStarUpgradeData();
      const weaponData = fetchWeaponUpgradeData();

      return (
            <div className="content">
                  <div className="m-8 rounded overflow-hidden shadow-lg card-background">
                        <div className="m-4">
                              <h1 className='text-2x1 font-bold mb-4'>{dict.page_title}</h1>
                        </div>
                  </div>
                  <div className="grid grid-cols-2">
                        <div className="mx-8 my-1 rounded overflow-hidden shadow-lg card-background">
                              <StarUpgradeCalculator dict={dict} starData={starData} />
                        </div>
                        <div className="mx-8 my-1 rounded overflow-hidden shadow-lg card-background">
                              <WeaponUpgradeCalculator dict={dict} weaponData={weaponData} />
                        </div>
                  </div>
                  <div className="m-8 rounded overflow-hidden shadow-lg card-background">
                        <div className="m-4">
                              test

                              <Link href="/en">EN</Link> / <Link href="/tw">TW</Link>
                        </div>
                  </div>
            </div>
      );
}