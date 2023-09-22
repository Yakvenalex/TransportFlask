import logging
import asyncpg


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger_db = logging.getLogger(__name__)

CONNECT_USR = "postgresql://latand:75251qqq@80.85.143.232:5432/transport_bot"


async def insert_data(table_name: str, data: dict):
    """
            Вставляет данные в таблицу.

            :param table_name: Название таблицы, в которую нужно вставить данные.
            :param data: Словарь с данными для вставки в формате {имя_колонки: значение}.
                Пример:
                {
                    'username': 'john_doe',
                    'email': 'john@example.com',
                    'age': 30
                }
            """

    try:
        async with asyncpg.create_pool(dsn=CONNECT_USR) as pool:
            async with pool.acquire() as conn:
                # Генерируем SQL-запрос для вставки данных в таблицу
                query = f"INSERT INTO {table_name} ({', '.join(data.keys())}) VALUES ({', '.join(['$' + str(i) for i in range(1, len(data) + 1)])})"
                # Выполняем запрос с данными
                await conn.execute(query, *data.values())
                logger_db.info(f"Данные успешно вставлены в таблицу '{table_name}'.")
                return True
    except Exception as e:
        logger_db.info(f"Произошла ошибка при вставке данных: {e}")
        return False