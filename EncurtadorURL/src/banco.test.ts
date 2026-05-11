import { expect, test, describe, beforeEach } from "bun:test";
import { inserirUrl, buscarPorCodigo, registrarAcesso, listarUrls } from "./banco";

describe("banco", () => {
    let prefix: string;

    beforeEach(() => {
        prefix = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    });

    describe("inserirUrl", () => {
        test("insere URL com código e data de criação", () => {
            const codigo = `t1_${prefix}`;
            const resultado = inserirUrl(codigo, "https://example.com");
            expect(resultado.codigo).toBe(codigo);
            expect(resultado.urlOriginal).toBe("https://example.com");
            expect(resultado.acessos).toBe(0);
            expect(resultado.criadoEm).toBeDefined();
        });

        test("insere URL com expiração", () => {
            const codigo = `t2_${prefix}`;
            const expiraEm = "2025-12-31T23:59:59Z";
            const resultado = inserirUrl(codigo, "https://example.com", expiraEm);
            expect(resultado.expiraEm).toBe(expiraEm);
        });
    });

    describe("buscarPorCodigo", () => {
        test("encontra URL existente", () => {
            const codigo = `b1_${prefix}`;
            inserirUrl(codigo, "https://buscarteste.com");
            const resultado = buscarPorCodigo(codigo);
            expect(resultado).not.toBeNull();
            expect(resultado?.urlOriginal).toBe("https://buscarteste.com");
        });

        test("retorna null para código inexistente", () => {
            const resultado = buscarPorCodigo(`inexist_${prefix}_99`);
            expect(resultado).toBeNull();
        });
    });

    describe("registrarAcesso", () => {
        test("incrementa contador de acessos", () => {
            const codigo = `a1_${prefix}`;
            inserirUrl(codigo, "https://example.com");
            registrarAcesso(codigo);
            const resultado = buscarPorCodigo(codigo);
            expect(resultado?.acessos).toBe(1);
        });
    });

    describe("listarUrls", () => {
        test("retorna lista de URLs", () => {
            const lista = listarUrls();
            expect(Array.isArray(lista)).toBe(true);
        });
    });
});
