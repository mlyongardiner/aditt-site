import logging
import os
from app import app

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    try:
        port = 3001
        logger.info(f"Starting Flask application on port {port}")
        app.run(host="0.0.0.0", port=port, debug=False)
    except Exception as e:
        logger.error(f"Failed to start Flask application: {str(e)}")
        raise