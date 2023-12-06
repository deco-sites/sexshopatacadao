import BackToTop from "$store/components/footer/BackToTop.tsx";
import FooterItems, {
  FooterSection,
} from "$store/components/footer/FooterItems.tsx";
import PaymentMethods, {
  PaymentItem,
} from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social, { SocialItem } from "$store/components/footer/Social.tsx";
import DeliveryOptions, {
  DeliveryOption,
} from "$store/components/footer/DeliveryOptions.tsx";
import Security, { SecurityItem } from "$store/components/footer/Security.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import PoweredByAgenciaEPlus from "deco-sites/sexshopatacadao/components/footer/PoweredByAgenciaEPlus.tsx";
import PoweredByVTEX from "deco-sites/sexshopatacadao/components/footer/PoweredByVTEX.tsx";

export interface Props {
  social?: {
    title?: string;
    items: SocialItem[];
  };
  sections?: FooterSection[];
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  deliveryOptions?: DeliveryOption[];
  securityItems?: SecurityItem[];

  /** @format html */
  copyright?: string;
}

function Footer({
  sections = [{
    "title": "Sobre",
    "content": {
      "kind": "list",
      "items": [
        {
          "href": "/quem-somos",
          "label": "Quem somos",
        },
        {
          "href": "/termos-de-uso",
          "label": "Termos de uso",
        },
        {
          "href": "/trabalhe-conosco",
          "label": "Trabalhe conosco",
        },
      ],
    },
  }, {
    "title": "Atendimento",
    "content": {
      "kind": "list",
      "items": [
        {
          "href": "/centraldeatendimento",
          "label": "Central de atendimento",
        },
        {
          "href": "/whatsapp",
          "label": "Fale conosco pelo WhatsApp",
        },
        {
          "href": "/trocaedevolucao",
          "label": "Troca e devolução",
        },
      ],
    },
  }],
  social = {
    title: "Redes sociais",
    items: [{ name: "Instagram", image: { icon: "Instagram" }, link: "/" }, {
      name: "Tiktok",
      image: { icon: "Tiktok" },
      link: "/",
    }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ name: "Mastercard", image: { icon: "Mastercard" } }, {
      name: "Visa",
      image: { icon: "Visa" },
    }, { name: "Pix", image: { icon: "Pix" } }],
  },
  deliveryOptions,
  securityItems,
  copyright,
}: Props) {
  return (
    <footer
      class={`w-full flex flex-col bg-gray-300 lg:bg-transparent font-sans pb-6 lg:pb-0`}
    >
      <div class="flex flex-col w-full bg-gray-300 pt-[30px] pb-9 lg:pt-5 items-center px-[5vw]">
        <Social {...social} />
        <div class="w-full mt-4 sm:mt-20 lg:max-w-[96rem] lg:mx-auto">
          <FooterItems sections={sections} justify />
        </div>
      </div>
      <div class="w-full lg:max-w-[96rem] lg:mx-auto lg:py-5 lg:px-24 flex flex-col sm:flex-row justify-between px-[5vw] pb-8 gap-9">
        <PaymentMethods content={payments} />
        <DeliveryOptions items={deliveryOptions} />
        <Security items={securityItems} />
      </div>
      <div class="px-[5vw]">
        <div class="w-full flex flex-col bg-white justify-center">
          {copyright && (
            <div class="w-full pb-8 md:pb-10 mt-4 px-1 text-center">
              <div
                class="prose [&_p]:mb-4 text-sm"
                dangerouslySetInnerHTML={{ __html: copyright }}
              />
            </div>
          )}
          <div class="flex flex-wrap items-center gap-4 sm:gap-9 justify-center pt-4 pb-5">
            <PoweredByAgenciaEPlus color="Green" />
            <PoweredByVTEX color="Pink" />
            <PoweredByDeco color="Green" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
