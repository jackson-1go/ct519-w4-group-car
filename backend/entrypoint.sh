#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
until bun run prisma db push --accept-data-loss; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready - starting application"

# Start the application
exec "$@"
