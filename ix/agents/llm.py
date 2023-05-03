import logging
from typing import Dict, Any, Union
from langchain.schema import BaseLanguageModel

from ix.agents.callback_manager import IxCallbackManager
from ix.utils.importlib import import_class


logger = logging.getLogger(__name__)


def load_llm(
    config_or_llm: Union[BaseLanguageModel, Dict[str, Any]],
    callback_manager: IxCallbackManager,
) -> BaseLanguageModel:
    """Load a langchain LLM model from config"""
    if isinstance(config_or_llm, BaseLanguageModel):
        return config_or_llm

    llm_class = import_class(config_or_llm["class_path"])
    logger.debug(f"loading llm config={config_or_llm}")
    llm = llm_class(**config_or_llm["config"])
    llm.callback_manager = callback_manager
    return llm


def load_chain(config: Dict[str, Any], callback_manager: IxCallbackManager):
    chain_class = import_class(config["class_path"])
    logger.debug(f"loading chain config={config}")
    instance = chain_class.from_config(
        config.get("config", {}), callback_manager=callback_manager
    )
    return instance
