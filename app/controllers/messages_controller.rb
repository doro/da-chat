class MessagesController < ApplicationController

  def index
    msgs = Message.all
    if params['bookmark']
      msgs = msgs.where('id > ?', params['bookmark'])
    end

    Rails.logger.info msgs.to_json
    
    respond_to do |format|
      format.json { render json: msgs.to_json }
    end
    
  end

  def create

    Message.create! txt: params['txt'], user_name: params['user_name'], timestamp: Time.now
    respond_to do |format|
      format.json { render json: {code: 200}.to_json }
    end
  end
end
