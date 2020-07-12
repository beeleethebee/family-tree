class PositionChannel < ApplicationCable::Channel
  def subscribed
    @position = Position.find(params[:id])
    stream_for @position
  end

  def received(data)
    PositionChannel.broadcast_to(@position, {x: @position.x, y: @position.y})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
