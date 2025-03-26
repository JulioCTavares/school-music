FROM oven/bun:1.1 AS builder
WORKDIR /app

RUN ls -la


# Copia apenas os arquivos essenciais para instalar as dependências
COPY . ./

RUN bun install

# Copia o restante do código
COPY . .

# Compila o código se necessário (exemplo para TypeScript)
RUN bun run build

# Produção
FROM oven/bun:1.1 AS runner
WORKDIR /app

# Copia apenas os arquivos necessários para rodar a aplicação
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["bun", "run", "dev"]
