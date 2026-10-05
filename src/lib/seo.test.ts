import { describe, expect, it } from "vitest";
import {
  homeSchema,
  languageAlternates,
  localeUrl,
  pageMetadata,
  projectsSchema,
  resumeSchema,
  serializeJsonLd,
} from "./seo";

const roundTrip = (data: unknown) => JSON.parse(serializeJsonLd(data));

describe("locale URLs", () => {
  it("leaves English unprefixed and prefixes the others", () => {
    expect(localeUrl("en", "/")).toBe("https://lucasmsa.com");
    expect(localeUrl("pt-BR", "/")).toBe("https://lucasmsa.com/pt-BR");
    expect(localeUrl("es", "/projects")).toBe("https://lucasmsa.com/es/projects");
  });

  it("lists every language plus x-default", () => {
    expect(languageAlternates("/writing")).toEqual({
      en: "https://lucasmsa.com/writing",
      "pt-BR": "https://lucasmsa.com/pt-BR/writing",
      es: "https://lucasmsa.com/es/writing",
      "x-default": "https://lucasmsa.com/writing",
    });
  });

  it("puts canonical, hreflang, robots and social cards on every page", () => {
    const m = pageMetadata({ locale: "pt-BR", path: "/projects", title: "T", description: "D" });
    expect(m.alternates?.canonical).toBe("https://lucasmsa.com/pt-BR/projects");
    expect(m.robots).toEqual({ index: true, follow: true });
    expect(m.openGraph).toMatchObject({ url: "https://lucasmsa.com/pt-BR/projects", locale: "pt_BR" });
    expect(m.twitter).toMatchObject({ card: "summary_large_image", images: ["https://lucasmsa.com/pt-BR/opengraph-image"] });
    expect(m.openGraph?.images).toEqual([
      { url: "https://lucasmsa.com/pt-BR/opengraph-image", width: 1200, height: 630, alt: "T" },
    ]);
  });
});

describe("JSON-LD", () => {
  it("describes the person with the agreed identity", () => {
    const graph = roundTrip(homeSchema("pt-BR"));
    expect(graph["@context"]).toBe("https://schema.org");
    const person = graph["@graph"].find((n: { "@type": string }) => n["@type"] === "Person");
    expect(person).toMatchObject({
      name: "Lucas Moreira",
      alternateName: ["Lucas Moreira e Silva Alves", "lucasmsa"],
      jobTitle: "Software Engineer",
      url: "https://lucasmsa.com",
      sameAs: ["https://github.com/lucasmsa", "https://www.linkedin.com/in/lucasmsa"],
      worksFor: { "@type": "Organization", name: "Koltin" },
      address: { addressLocality: "João Pessoa", addressRegion: "Paraíba", addressCountry: "BR" },
    });
    expect(person.knowsAbout).toContain("TypeScript");
    const types = graph["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(["Person", "WebSite", "ProfilePage"]);
  });

  it("makes the resume a ProfilePage about the person", () => {
    const page = roundTrip(resumeSchema());
    expect(page["@type"]).toBe("ProfilePage");
    expect(page.mainEntity.name).toBe("Lucas Moreira");
  });

  it("lists projects in order with names and URLs", () => {
    const list = roundTrip(
      projectsSchema("en", [
        { name: "A", url: "https://a.example", description: "a" },
        { name: "B", url: "https://b.example", description: "b" },
      ]),
    );
    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement.map((i: { position: number }) => i.position)).toEqual([1, 2]);
    expect(list.itemListElement[1].item).toMatchObject({ "@type": "CreativeWork", name: "B", url: "https://b.example" });
  });

  it("escapes < so data cannot close the script tag", () => {
    expect(serializeJsonLd({ x: "</script><script>" })).not.toContain("</script>");
  });
});
