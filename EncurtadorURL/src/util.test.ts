import { expect, test, describe } from "bun:test";
import { gerarCodigo, urlValida, codigoValido } from "./util";

describe("gerarCodigo", () => {
    test("gera com 6 caracteres por padrão", () => {
        expect(gerarCodigo()).toHaveLength(6);
    });

    test("gera com tamanho customizado", () => {
        expect(gerarCodigo(10)).toHaveLength(10);
    });

    test("contém apenas caracteres válidos", () => {
        const codigo = gerarCodigo();
        expect(/^[A-Za-z0-9]+$/.test(codigo)).toBe(true);
    });
});

describe("urlValida", () => {
    test("aceita http", () => {
        expect(urlValida("http://ifes.edu.br")).toBe(true);
    });

    test("aceita https", () => {
        expect(urlValida("https://ifes.edu.br")).toBe(true);
    });

    test("rejeita string aleatória", () => {
        expect(urlValida("abc")).toBe(false);
    });

    test("rejeita URL sem protocolo", () => {
        expect(urlValida("ifes.edu.br")).toBe(false);
    });

    test("rejeita ftp", () => {
        expect(urlValida("ftp://files.edu.br")).toBe(false);
    });
});

describe("codigoValido", () => {
    test("aceita código com 6 caracteres", () => {
        expect(codigoValido("aB3xK9")).toBe(true);
    });

    test("aceita código com 4 caracteres", () => {
        expect(codigoValido("aB3x")).toBe(true);
    });

    test("aceita código com 10 caracteres", () => {
        expect(codigoValido("aB3xK9aB3x")).toBe(true);
    });

    test("rejeita código com 3 caracteres", () => {
        expect(codigoValido("aB3")).toBe(false);
    });

    test("rejeita código com 11 caracteres", () => {
        expect(codigoValido("aB3xK9aB3x1")).toBe(false);
    });

    test("rejeita código com caracteres especiais", () => {
        expect(codigoValido("aB3x-K9")).toBe(false);
    });

    test("rejeita código com espaço", () => {
        expect(codigoValido("aB3x K9")).toBe(false);
    });
});
